"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
// import { Server } from 'socket.io';
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/', index_1.default);
const port = process.env.PORT || 3010;
const uriDb = process.env.MONGO_DB_URI;
const server = http_1.default.createServer(app);
// const io = new Server(server);
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(uriDb)
    .then(() => {
    console.log('Database connected successfully 🛢️');
    server.listen(port, () => {
        console.log(`Server is running at port ${port}`);
    });
})
    .catch((error) => {
    console.log({ error });
    process.exit(1);
});
// let roomUsers: { [s: string]: unknown; } | ArrayLike<unknown>;
// io.on('connection', (socket) => {
// io.emit('users_response', roomUsers);
// socket.on('join_room', (roomId) => {
//   socket.join(roomId);
//   roomUsers = {
//     ...roomUsers,
//     [roomId]: [...(roomUsers[roomId] ?? []), socket.id],
//   };
//   io.emit('users_response', roomUsers);
// });
// socket.on('send_message', (data) => {
//   io.emit('receive_message', data);
// });
// socket.on('disconnect', () => {
//   for (const [roomId, users] of Object.entries(roomUsers)) {
//     if (users.includes(socket.id)) {
//       roomUsers[roomId] = [...users.filter((id: string) => id !== socket.id)];
//       io.emit('receive_message', {
//         text: 'A user left the room.',
//         socketId: 'kurakani',
//         roomId: roomId,
//       });
//     }
//   }
//   io.emit('users_response', roomUsers);
// });
// });
