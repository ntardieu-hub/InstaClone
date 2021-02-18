const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const decodeIDToken = require('./authenticateToken');
const postsRouter = require('./controllers/posts');


const app = express();
app.use(cors());
app.use(decodeIDToken);
app.use(express.json());
var server = require('http').Server(app);
const socketIo = require('socket.io');


// socket
io = socketIo(server, {
    cors :{
        origin: "*",
    }
})

app.use(function (req, res, next){
    req.io = io,
    next(); 
})

mongoose.connect(
    process.env.DB_MONGO_URL,
    {
        useNewUrlParser: true, useUnifiedTopology: true 
    }
).then(() => {
    console.log('Connected to database');
}).catch((err) => console.log('Error connecting database', err.message));



app.use('/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Hello world !');
});

const PORT = 3001;

server.listen(PORT, () => {
    console.log(`Serveur is running on port ${PORT}`);
})