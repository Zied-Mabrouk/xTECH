const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user.routes.js');
const messageRoutes = require('./routes/message.routes.js');
require('dotenv').config({ path: './config/.env' })
require('./config/db');

var cors = require("cors");
const app = express();
const {Server} = require('socket.io');
const http = require('http');
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({origin:"*"}))
const io = new Server(server,{
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});


app.use("/users",userRoutes)
app.use("/messages",messageRoutes)

io.on("connection", (socket) => {
    socket.on("send_message", (data)=>{
        socket.broadcast.emit("receive_message",data)
    })
});
server.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
});
