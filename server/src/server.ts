import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
// import mongoose from 'mongoose';
// import routes from "./routes/index.js";
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/api/v1/", routes);

const port = process.env.PORT || 3010;
// const uriDb = process.env.MONGODB_URL;
const server = http.createServer(app);
const io = new Server(server);

// mongoose.set('strictQuery', true);
// mongoose
//   .connect(`${uriDb}`)
//   .then(() => {
//     console.log('Database connected successfully');
//     server.listen(port, () => {
//       console.log(`Server is running at port ${port}`);
//     });
//   })
//   .catch((error) => {
//     console.log({ error });
//     process.exit(1);
//   });

app.get('/', (req, res) => {
  res.send('Hello NOD Readers!');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`Express server is listening at http://localhost:${port} 🚀`);
});
