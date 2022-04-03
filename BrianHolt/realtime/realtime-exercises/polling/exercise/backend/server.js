import express from "express";
import bodyParser from "body-parser";
import nanobuffer from "nanobuffer";
import morgan from "morgan";

// set up a limited array
const msg = new nanobuffer(50);
const getMsgs = () => Array.from(msg).reverse();

// feel free to take out, this just seeds the server with at least one message
msg.push({
  user: "brian",
  text: "hi",
  time: Date.now(),
});

// get express ready to run
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json()); // deprecated, but he knows
app.use(express.static("frontend"));

app.get("/poll", function (req, res) {
  // use getMsgs to get messages to send back
  res.json({
    msg: getMsgs(),
  });
});

app.post("/poll", function (req, res) {
  // add a new message to the server
  const { user, text } = req.body;

  msg.push({
    user,
    text,
    time: Date.now(),
  });

  res.json({ 
    status: "ok",
  })
});

// start the server
const port = process.env.PORT || 3000;  // process.env.PORT is habit after working in cloud, will insert the correct port if 3000 in this case is not available
app.listen(port);
console.log(`listening on http://localhost:${port}`);


// "pro tip: DON'T SHIP."
  // can use this to generate server failures, but this is NOT good programming.
  // in app.get()
  // res.status(Math.random() > 0.5 ? 200 : 500).json({
  //   msg: getMsgs(),
  // });
