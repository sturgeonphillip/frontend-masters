const chat = document.getElementById("chat");
const msgs = document.getElementById("msgs");
const presence = document.getElementById("presence-indicator");
let allChat = [];

// listen for events on the form
chat.addEventListener("submit", function (e) {
  e.preventDefault();
  postNewMsg(chat.elements.user.value, chat.elements.text.value);
  chat.elements.text.value = "";
});

async function postNewMsg(user, text) {
  // code goes here
  const data = { user, text };

  ws.send(JSON.stringify(data));
}
// 
const ws = new WebSocket("ws://localhost:8080", ["json"]);

ws.addEventListener("open", () => {
  console.log('connected');
  presence.innerText = "🟢"
})

ws.addEventListener("message", (event) => { // accept the message
  const data = JSON.parse(event.data);  // parse it
  allChat = data.msg; // collect the information that you want
  render(); // render it to the page 
});

ws.addEventListener("close", () =>  {
  presence.innerText = "🔴";
});

function render() {
  const html = allChat.map(({ user, text }) => template(user, text));
  msgs.innerHTML = html.join("\n");
}

const template = (user, msg) =>
  `<li class="collection-item"><span class="badge">${user}</span>${msg}</li>`;
