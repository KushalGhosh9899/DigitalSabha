//Node Server which will handle Socket IO connections

const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("new user = ", name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {name: users[socket.id], message: message})
    })
})