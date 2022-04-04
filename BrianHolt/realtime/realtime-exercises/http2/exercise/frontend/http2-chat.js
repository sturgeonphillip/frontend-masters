const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");
const presence = document.getElementById("presence-indicator");

// this will hold all the most recent messages
let allChat = [];

chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  const data = {
    user,
    text,
  };

  // request options
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // send POST request
  // we're not sending any json back, but we could
  await fetch("/msgs", options);
}

async function getNewMsgs() {
  let reader;
  const utf8Decoder = new TextDecoder("utf-8");
  try {
    const res = await fetch("/msgs");
    reader = res.body.getReader();
  } catch (e) {
    console.log("connection error", e);
  }
  let done;
  presence.innerText = "🟢";
  do {
    let readerResponse;
    try {
      readerResponse = await reader.read();
    } catch (e) {
      console.error("reader failed", e);
      presence.innerText = "🔴";
      return;
    }
    done = readerResponse.done;
    const chunk = utf8Decoder.decode(readerResponse.value, { stream: true });
    if (chunk) {
      try {
        const json = JSON.parse(chunk);
        allChat = json.msg;
        render();
      } catch (e) {
        console.error("parse error", e);
      }
    }
    console.log("done", done);
  } while (!done);
  // in theory, if our http2 connection closed, `done` would come back
  // as true and we'd no longer be connected
  presence.innerText = "🔴";
}

function render() {
  const html = allChat.map(({ user, text, time, id }) =>
    template(user, text, time, id)
  );
  msgs.innerHTML = html.join("\n");
}

const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

getNewMsgs();






/** ME */
// const chat = document.getElementById("chat");
// const msgs = document.getElementById("msgs");
// const presence = document.getElementById("presence-indicator");

// // this will hold all the most recent messages
// let allChat = [];

// chat.addEventListener("submit", function (e) {
//   e.preventDefault();
//   postNewMsg(chat.elements.user.value, chat.elements.text.value);
//   chat.elements.text.value = "";
// });

// async function postNewMsg(user, text) {
//   const data = {
//     user,
//     text,
//   };

//   // request options
//   const options = {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };

//   // send POST request
//   // we're not sending any json back, but we could
//   await fetch("/msgs", options);
// }

// async function getNewMsgs() {
//   let reader;
//   const utf8Decoder = new TextDecoder("utf-8"); // it comes encoded and this decodes it into something we can use
//   try {
//     const res = await fetch("/msgs");
//     reader = res.body.getReader(); // getReader() turns our reader variable into a readable text stream. since there's a response body and it's incomplete (and won't stop after one response), give something back that reader can use. 
//   } catch (e) {
//     console.log("connection error: ", e);
//   }
//   let done;
//   presence.innerText = "🟢";

//   do {
//   let readerResponse;
//   try {
//     readerResponse = await reader.read(); // wait here until the API sends me back something new
//   } catch(e) {
//     console.error("reader failed", e);
//     presence.innerText = "🔴";
//     return;
//   }
//   done = readerResponse.done; // eventually the loop will close from the server.
//   const chunk = utf8Decoder.decode(readerResponse.value, { stream: true }); // passess the response into the decoder to decode and then informs that it's not complete
//   if (chunk) {
//     try {
//       const json = JSON.parse(chunk);
//       allChat = json.msg;
//       render();
//     } catch (e) {
//       console.error("parse error", e);
//     }
//   }
//   console.log("done", done);
// } while (!done); // could also be while (true);
// presence.innerText = "🔴"; // if the do-while loop finishes and you're disconnected.
// }

// function render() {
//   const html = allChat.map(({ user, text, time, id }) =>
//     template(user, text, time, id)
//   );
//   msgs.innerHTML = html.join("\n");
// }

// const template = (user, msg) =>
//   `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

// getNewMsgs();


// // we have to write code for a long running connection. remember, this is not what http2 push was built for so we're kind of abusing it, which is fun.

// // http2 is unidirectional ( at least in this case, the way we're using it). data streams from server to the client, but not the reverse. ( that would be a websocket )

// react ==> don't dispose of connections
// rx js --> reactive sockets
