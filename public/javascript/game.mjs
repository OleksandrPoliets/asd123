import { setVisibilityRooms, setVisibilityFame } from './test.js'
import { renderRoomsList, renderTimer } from './renderRoomsList.js'
import { renderusersColumn, renderUserInfo, renderGameText } from './renderGameRoom.js'

const username = sessionStorage.getItem("username");
const id = sessionStorage.getItem("id");
const socket = io("http://localhost:3002/game", { query: { username, id } });
const createRoom = document.getElementById('create-room');
let gameRoom;

if (!username) {
  window.location.replace("/login");
}

const isExistUser = () => {
  sessionStorage.clear();
  window.location.replace("/login");
  alert('User is Exist please enter another Login');
}

const isExistRoom = () => {
  alert('Room is Exist please enter another Room name');
}

const readyToGame = () => {
  const user = username.split(' ').join('');
  const ready = document.getElementById('ready-btn');
  const btnInnerText = ready.innerText;
  const userStatus = document.getElementById(`${user}-status`);

  if (btnInnerText === 'Ready') {
    ready.innerText = 'Not ready';
  } else {
    ready.innerText = 'Ready';
  }

  userStatus.classList.toggle('green');
  userStatus.classList.toggle('red');
  socket.emit('USER_STATUS', {gameRoom, username});
}

const backToRooms = () => {
  const leaveGame = document.getElementById('back-to-rooms');
  const gameWindow = document.querySelector('.game-window');
  leaveGame.removeEventListener('click', backToRooms)
  socket.emit('LEAVE_GAME', {gameRoom, username});
  gameWindow.remove();
  setVisibilityRooms();
  setVisibilityFame();
}

const startGame = ({ roomName, users }) => {
  gameRoom = roomName;
  setVisibilityRooms();
  setVisibilityFame();
  const usersList = renderusersColumn(roomName);
  users.map(el => {
    const you = el.userName === username;
    usersList.appendChild(renderUserInfo(el, you));
  });
  renderGameText();
  const leaveGAme = document.getElementById('back-to-rooms');
  const ready = document.getElementById('ready-btn');

  ready.addEventListener('click', readyToGame)
  leaveGAme.addEventListener('click', backToRooms);

}

const handleJoin = event => {
  if (event.target.tagName === 'BUTTON'){
    socket.emit('JOIN_TO_ROOM', event.target.id);
  }
}

const updateRooms = rooms => {
  if(rooms){
    const cards = renderRoomsList(rooms);
    cards.addEventListener('click', handleJoin);
  }
}

const updateUserListInGAme = user => {
  const infoWrap = document.getElementById('info-wrap');
  infoWrap.appendChild(renderUserInfo(user))
}

const delUserFromInfo = user => {
  const delInfoUser = document.getElementById(`${user}-info`);
  delInfoUser.remove();
}

const prepareToRide = getTimer => {
  const backBtn = document.getElementById('back-to-rooms');
  const readyBtn = document.getElementById('ready-btn');
  const gameText = document.querySelector('.game-text');
  const miliseconds = 1000;
  const time = renderTimer();
  let timer = getTimer;
  backBtn.classList.toggle('display-none');
  readyBtn.classList.toggle('display-none');
  gameText.appendChild(time);

  const interval = setInterval(() => {

    timer -= 1;
    time.innerText = timer;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
  },getTimer*miliseconds);

  console.log(timer)

}
const updateUserStatus = (user, status) => {
  const userStatus = document.getElementById(`${user}-status`);
  userStatus.classList.toggle('green');
  userStatus.classList.toggle('red');

}
createRoom.addEventListener('click', ()=>{
  const roomName = prompt('Enter room name');
  socket.emit('CREATE_ROOM', roomName);
});
socket.on('NAME_IS_EXIST', isExistUser);
socket.on('UPDATE_ROOMS', roomsName => {
  console.log(roomsName)
  updateRooms(roomsName)
});
socket.on('ROOM_IS_EXIST', isExistRoom);
socket.on("JOIN_OK", roomName => {
  startGame(roomName);
});
socket.on("UPDATE_GAME_ROOM", newUser => {
  updateUserListInGAme(newUser);
});
socket.on("DELETE_USER", delUser => {
  const userToDelete = delUser.split(' ').join('');
  delUserFromInfo(userToDelete)
});
socket.on("UPDATE_USER_STATUS", ({username, status}) => {
  const userStatusUpdate = username.split(' ').join('');
  updateUserStatus(userStatusUpdate, status);
});
socket.on("PREPARE_TO_RIDE", timer => {
  prepareToRide(timer);
});






