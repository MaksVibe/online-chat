import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import http from 'http';
// import { Server } from 'socket.io';
import mongoose from 'mongoose';
import routes from './routes/index';
import 'dotenv/config';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/', routes);

const port = process.env.PORT || 3010;
const uriDb = process.env.MONGO_DB_URI;
const server = http.createServer(app);
// const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Hello NOD Readers!');
});

mongoose.set('strictQuery', true);
mongoose
  .connect(uriDb as string)
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
