import http2 from "http2"; // from node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import handler from "serve-handler"; // from vercel, serves static assets
import nanobuffer from "nanobuffer";

let connections = [];

const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

msg.push({
  user: "brian",
  text: "hi",
  time: Date.now(),
});
// the two commands you'll have to run in the root (not inside the backend folder) directory of the project
// openssl req -new -newkey rsa:2048 -new -nodes -keyout key.pem -out csr.pem
// openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out server.crt
// http2 only works over HTTPS
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = http2.createSecureServer({
  cert: fs.readFileSync(path.join(__dirname, "/../server.crt")),
  key: fs.readFileSync(path.join(__dirname, "/../key.pem")),
});
// everything makes a stream and a request
server.on("stream", (stream, headers) => {
  const method = headers[":method"]; // library gives it back with the colon ahead of it 
  const path = headers[":path"];

  // streams open for every request from the browser
  if (path === "/msgs" && method === "GET") {
    // immediately reply with 200 OK and the encoding
    console.log("connected a stream" + stream.id); // fyi node will reuse id
    stream.respond({
      ":status": 200,
      "content-type": "text/plain; charset=utf-8", // make no assumptions, freeform data is coming
    })

    // write the first response 
    stream.write(JSON.stringify({ msg: getMsgs() }));

    // keep track of the connection
    connections.push(stream);

    // when the connection closes, stop keeping track of it
    stream.on("close", () => {
      console.log("disconnected " + stream.id);
      connections = connections.filter((s) => s !== stream); // filter checks if s and stream point to the same object in memory, also see end note re: fp
    });
  }
});

server.on("request", async (req, res) => {
  const path = req.headers[":path"];
  const method = req.headers[":method"];

  if (path !== "/msgs") {
    // handle the static assets
    return handler(req, res, {
      public: "./frontend",
    });
  } else if (method === "POST") {
    // get data out of post
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString(); // essentially what express body parser does 
    const { user, text } = JSON.parse(data);
    msg.push({
      user,
      text,
      time: Date.now(),
    });

    // done with request
    res.end();

    // notify all connected users
    connections.forEach((stream) => {
      stream.write(JSON.stringify({ msg: getMsgs() }));
    });
  }
});

// start listening
const port = process.env.PORT || 8080;
server.listen(port, () =>
  console.log(
    `Server running at https://localhost:${port} - make sure you're on httpS, not http`
  )
);


// * line 58 is functional programming: go and remove whatever 'stream' is from connections array and then make that the new connections (ie if user 79 quits it'll go find connection 79 and remove it from active streams)
