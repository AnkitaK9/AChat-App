const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.MessageArea')
do {
    name = prompt('Please Enter your name to join chat: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Message will be appended 
    appendMessage(msg, 'OutgoingMessage')
    textarea.value = ''
    scrollToBottom()

    // Message will  be send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// all the recieved messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'IncomingMessage')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



