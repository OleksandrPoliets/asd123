import game from "./game";



export default io => {
  game(io.of("/game"));

  // counterWithRooms(io.of("/counter-with-rooms"));
};

// export default io => {
//   io.on("connection", socket => {
//     socket.use(() => {
//       socket.emit(config.NAME_IS_EXIST, 'Name is Exist');
//     });
//     console.log(socket.handshake.query.username)
//     // const username = socket.handshake.query.username;
//   });
// };
