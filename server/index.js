const express = require('express');
const bodyParser = require('body-parser');

const friendRoutes = require('./routes/friend.routes.js');
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


app.use("/friends",friendRoutes)

io.on("connection", (socket) => {
    console.log("New client connected"+socket.id);
    socket.on("send_message", (data)=>{
        socket.broadcast.emit("receive_message",data)
    })
});
server.listen(process.env.PORT, () => {
    console.log('Listening on port ' + process.env.PORT);
});
