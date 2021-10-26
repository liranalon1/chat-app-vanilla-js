//  this is generator for faker lib --> do not delete
(()=>{const e=()=>([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16));let a,t=()=>null,n=()=>null,r=0;const o=[faker.name.firstName(),faker.name.firstName(),faker.name.firstName()],s=e=>t(e),l=(a,t="Me")=>{s({content:a,user:t,id:e(),timestamp:Date.now()})},m=()=>o[Math.round(2*Math.random())],c=()=>{r=0,clearInterval(a),a=setInterval(()=>{r>=3?clearInterval(a):(l(faker.hacker.phrase(),m()),r++)},5e3)},d=()=>{const e=m();n(e);const a=1e3*(Math.floor(10*Math.random())+4);setTimeout(d,a)};d(),document.addEventListener("keydown",()=>{n("Me")}),window.Chat={sendMessage(e){c(),l(e)},onMessage(e){c(),t=e},onTyping(e){n=e}}})();

//  global variabels
const msgBtn = document.querySelector('.msg-btn');
const msgInput = document.querySelector('.msg-input');
const messagesWrap = document.querySelector('.messages');
const userTyping = document.querySelector('.user-typing');
const usersArr = [];

// events
window.Chat.onMessage((message) => {
  createNewMsg(message);
});

window.Chat.onTyping((username) => {
  handleTyping(username);
});

msgBtn.addEventListener('click', showMyMsg);

//  functions
function showMyMsg(e) {
  e.preventDefault();
  if (msgInput.value === '') return;
  window.Chat.sendMessage(msgInput.value);
  msgInput.value = '';
  scrollToBottom();
}

function createNewMsg(newMsg){
    console.log(newMsg);
    const newMsgElem = document.createElement('li');
    newMsgElem.innerText = newMsg.content;
    newMsgElem.classList.add('message', 'with-arrow');
  if (newMsg.user === 'Me') {
    newMsgElem.classList.add('self');
  } else {
    //  create user name inside message
    const userNameElem = document.createElement('span');
    userNameElem.innerHTML = newMsg.user;
    userNameElem.classList.add('user-name');
    newMsgElem.prepend(userNameElem);
  }
  messagesWrap.appendChild(newMsgElem);
  setMessageTime(newMsgElem, newMsg.timestamp);
  scrollToBottom();
}

function setMessageTime(messageBox, dataTime) {
  const messageTimeElem = document.createElement('span');
  const messageTime = dataTime * 1000;
  const convertedTime = new Date(messageTime).toLocaleTimeString();
  messageTimeElem.classList.add('messageTime');
  messageTimeElem.innerText = convertedTime;
  messageBox.appendChild(messageTimeElem);
}

function handleTyping(typingName) {
  if (!usersArr.includes(typingName)) {
    usersArr.push(typingName);
    userTyping.innerText = `${usersArr} is writing...`;

    setTimeout(() => {
      usersArr.splice(0); // remove all users from usersArr
      userTyping.innerText = ``;
    }, 8000);
  }
}

function scrollToBottom() {
  messagesWrap.scrollTop = messagesWrap.scrollHeight;
}