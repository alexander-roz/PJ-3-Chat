const url = "wss://echo-ws-service.herokuapp.com";

const text_message = document.getElementById('text_message');
const send_btn = document.getElementById('send_btn');
const chat_window = document.getElementById('chat_window');
const chat_messages = document.getElementById('chat_messages');
const geo_loc = document.getElementById('geo_loc');


//Соединение:
let websocket;

websocket = new WebSocket(url);
websocket.onopen = function (evt) {
  console.log("CONNECTED");
};
websocket.onclose = function (evt) {
  console.log("DISCONNECTED");
};
websocket.onmessage = function (evt) {
  writeToScreen('<span style="color: white;">Herokuapp answer:<br> ' + evt.data + '</span>', 'flex-start')
};
websocket.onerror = function (evt) {
  writeToScreen('<span style="color: red;">ERROR:<br></span> ' + evt.data, 'flex-start')
};


//Вывод имени юзера на странице index.html
function onPageLoad() {
  let user = sessionStorage.getItem("name");
  document.getElementById("userName").innerHTML = "User: " + user;
  console.log(user);
  getList(user);
}

//Отправка сообщения через кнопку:
send_btn.addEventListener('click', send);

/*Отправка сообщения с помощью enter + запрет на перенос на новую строку с помощью enter 
(перенос осуществляется с помощью enter+shift): */
text_message.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    send();
  }
});

function send() {
  if (text_message.value !== '') {
    const message = text_message.value.replace(/\n/g, "<br>"); // сохраняем абзацы из text_message в окне чата
    writeToScreen("You write:<br> " + message);
    websocket.send(message);
    addMessage(message);
    text_message.value = ''; // очистка поля text_message после отправки сообщения в чат
  }
}

//Растягивание textarea (text_message):
let textarea = document.getElementsByTagName('textarea');
for (let i = 0; i < textarea.length; i++) {
  textarea[i].setAttribute('style', 'height:' + (textarea[i].scrollHeight) + 'px; if overflow-y: auto; resize: vertical;');
  textarea[i].addEventListener("input", OnInput, false);
}
function OnInput() { // для расширения textarea при вводе текста больше, чем 1 строка
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

//Вывод сообщения:
function writeToScreen(message, flex_position = 'flex-end') {
  let p = `<p class='messages' style='align-self: ${flex_position}'>${message}</p>`;
  chat_messages.innerHTML += p;
  chat_window.scrollTop = chat_window.scrollHeight;
}

//Гео-локация:
// Функция, выводящая текст об ошибке:
const error = () => {
  let text_error = 'It is impossible to get your location';
  writeToScreen(text_error);
}

//Функция, срабатывающая при успешном получении геолокации:
const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const link_geo = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  writeToScreen(`<a  href='${link_geo}' target='_blank'>My geo location</a>`);
}

geo_loc.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeToScreen('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});

function addMessage(text){
  let user = sessionStorage.getItem("name");
  console.log("from addUser() " + user);

  fetch("/messages/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: text,
      user: user
    }),

  })
      .then(response => response.json())
      .catch(error => console.error(error));
}

function getList(userName){
  console.log("sending to server user: " + userName);

  fetch("/list/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: userName
    })
  })
      .then((response) => response.json())
      .then((response) => {
        console.log("js got the list: " + response)
        response.forEach((message) => {
          writeToScreen(message);
        });
      })
      .catch((error) => console.error(error));
}

