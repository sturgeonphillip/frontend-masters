const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");

// let's store all current messages here
let allChat = [];

// the interval to poll at in milliseconds
const INTERVAL = 3000;

// a submit listener on the form in the HTML
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  // post to /poll a new message
  const data = {
    user,     // user: user, implied if key:val are the same with objects
    text,     // text: text, (dogs:dogs === dogs)
  }

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
     "Content-Type": "application/json"
    }
  }
  // const res = await fetch("/poll", options);
  // const json = await res.json();
  await fetch("/poll", options);
}

async function getNewMsgs() {
  // poll the server
  let json;
  try {
    const res = await fetch("/poll");
    json = await res.json();

    // will throw an error if it doesn't connect, but won't throw if it gets a 500
    if (res.status >= 400) {
      throw new Error("request did not succeed: " + res.status);
    }

    allChat = json.msg;
    render();
    failedTries = 0;
  } catch (e) {
    // backoff code
    console.error("polling error", e);
    failedTries++;
  }


  // setTimeout(getNewMsgs, INTERVAL);
  // calls itself, but waits until the preceding fx code ( line 23 - 35 ) completes first. so if it takes 5 minutes, the setTimeout won't run (won't call getNewMsgs) until after the 5 min + INTERVAL variable.
}

function render() {
  // as long as allChat is holding all current messages, this will render them
  // into the ui. yes, it's inefficient. yes, it's fine for this example.
  const html = allChat.map(({ user, text, time, id }) =>
    template(user, text, time, id)
  );
  msgs.innerHTML = html.join("\n");
}

// given a user and a msg, it returns an HTML string to render to the UI.
const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;

 const BACKOFF = 5000;
 let timeToMakeNextRequest = 0;
 let failedTries = 0;
 async function rafTimer(time) {
  //  console.log(time); <== RAPID
   if (timeToMakeNextRequest <= time) {
     await getNewMsgs();
     timeToMakeNextRequest = time + INTERVAL + failedTrieds * BACKOFF; // for every additional try, adds 5 seconds between each try.
   }
   requestAnimationFrame(rafTimer);
 }

requestAnimationFrame(rafTimer);

// // make the first request
// getNewMsgs();

// backoff and retry aren't code intensive, but they do a lot to decide the interval between each successive poll to the server, which can greatly impact whether or not you will have server errors and get DDOS.

// re: time variable
// time is time since the page loaded, which begins immediately at load.
// by starting timeToMakeNextRequest at 0, there's a guarantee it runs as soon as the page loads because it won't be quicker than the time variable. And, since all `time` after load will be greater than 0, timeToMakeNextRequest will always be less than 0.
