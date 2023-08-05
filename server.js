<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");
const parentRoutes = require("./routes/parent");
const { Server } = require("socket.io");
const http = require("http");

process.env.NODE_ENV === "development"
  ? mongoose
      .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Local DB connected successfully!!"))
      .catch((err) => console.log(err))
  : mongoose
      .connect(process.env.MONGODB_URI_CLOUD)
      .then(() => console.log("Cloud DB connected successfully!!"))
      .catch((err) => console.log(err));
=======
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv").config()
const teacherRoutes = require('./routes/teacher')
const studentRoutes = require('./routes/student')
const parentRoutes = require('./routes/parent')
const {Server} = require('socket.io')
const http = require('http')

process.env.NODE_ENV === "development"
    ? mongoose
          .connect(process.env.MONGODB_URI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
          })
          .then(() => console.log("Local DB connected successfully!!"))
          .catch((err) => console.log(err))
    : mongoose
          .connect(process.env.MONGODB_URI_CLOUD)
          .then(() => console.log("Cloud DB connected successfully!!"))
          .catch((err) => console.log(err));
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1

const app = express();
const port = process.env.PORT;

<<<<<<< HEAD
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json({ message: "Welcome to Solynta!" });
});

app.use("/student", studentRoutes);
app.use("/teacher", teacherRoutes);
app.use("/parent", parentRoutes);
=======
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (request, response) => {
    response.json({message: "Welcome to Solynta!"})
})

app.use('/student', studentRoutes)
app.use('/teacher', teacherRoutes)
app.use('/parent', parentRoutes)
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1

// Creating the server
const server = http.createServer(app);

// Establish connection to socket.io
const io = new Server(server, {
<<<<<<< HEAD
  cors: {
    // origin: "*",
    origin: "http://localhost:3000",
    // origin: [
    //   "https://cosret-frontend.vercel.app",
    //   "https://cosret-frontend-effiemmanuel.vercel.app",
    //   "https://cosret-frontend-git-main-effiemmanuel.vercel.app",
    // ],
  },
});

let activeUsers = [];

// Listening for io connection event
io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("add-new-user", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    io.emit("get-active-users", activeUsers);
  });

  //   Listening for when a user joins a chat room
  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`User with ID:${socket.id} joined room: ${data}`);
  });

  socket.on("send-message", async (data) => {
    console.log("MESSAGE:", data);
    const req = {
      body: {
        text: data.text,
      },
      query: {
        chatRoomId: data.chatRoom,
        sender: data.sender,
        modelType: data.modelType,
      },
    };
    // createMessage(req, {})
    //   .then((res) => {
    //     console.log("RES:", res);
    //     socket.to(data.chatRoom).emit("receive-message", res);
    //   })
    //   .catch((err) => {
    //     console.log("ERR:", err);
    //   });
  });

  //   Listening for a disconnect event
  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-active-users", activeUsers);
  });
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
=======
    cors: {
      origin: "*",
      // origin: ["http://localhost:3000", "https://cosret-frontend.vercel.app"],
      // origin: [
      //   "https://cosret-frontend.vercel.app",
      //   "https://cosret-frontend-effiemmanuel.vercel.app",
      //   "https://cosret-frontend-git-main-effiemmanuel.vercel.app",
      // ],
    },
  });
  
  let activeUsers = [];
  
  // Listening for io connection event
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
  
    socket.on("add-new-user", (newUserId) => {
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({
          userId: newUserId,
          socketId: socket.id,
        });
      }
      io.emit("get-active-users", activeUsers);
    });
  
    //   Listening for when a user joins a chat room
    socket.on("join-room", (data) => {
      socket.join(data);
      console.log(`User with ID:${socket.id} joined room: ${data}`);
    });
  
    socket.on("send-message", async (data) => {
      console.log("MESSAGE:", data);
      const req = {
        body: {
          text: data.text,
        },
        query: {
          chatRoomId: data.chatRoom,
          sender: data.sender,
          modelType: data.modelType,
        },
      };
      createMessage(req, {})
        .then((res) => {
          console.log("RES:", res);
          socket.to(data.chatRoom).emit("receive-message", res);
        })
        .catch((err) => {
          console.log("ERR:", err);
        });
    });
  
    //   Listening for a disconnect event
    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      io.emit("get-active-users", activeUsers);
    });
  });

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})
>>>>>>> 02cbd1d006f56b4071817f1ffc0daf4cf15632f1
