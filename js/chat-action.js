const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position)=>{
    const messageElement = document.createElement('p');
    messageElement.innerText = message;  
    messageElement.classList.add(position); 
    const messageTime = document.createElement('time');
    messageTime.innerText='17.00';
    messageElement.appendChild(messageTime);  
    messageContainer.append(messageElement);
}

const appendMessage = (message, position)=>{
    const msg_li = document.createElement('li');
    msg_li.classList.add(position);
    const msg_div = document.createElement('div');
    msg_div.classList.add('msg');
    msg_li.appendChild(msg_div);
    const msg_p =document.createElement('p');
    msg_p.innerText=message;
    msg_div.appendChild(msg_p);
    const msgTime = document.createElement('time');
    msgTime.innerText='17.00';
    msg_div.appendChild(msgTime);  
    messageContainer.append(msg_li);
}

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const message =messageInput.value;
    appendMessage(`You: ${message}`, 'self');
    socket.emit('send', message);
    messageInput.value='';

})
const name = prompt("Enter Name ");
socket.emit('new-user-joined',name);

socket.on('user-joined', name =>{
    append(`${name} Joined the group`, 'notification');
})

socket.on('receive', data =>{
    appendMessage(`${data.name}: ${data.message}`, 'other');
})