const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const userFrom =  document.getElementById('send-User')
const userInput = document.getElementById('name-input')
const data = new Date()

let logar = false

var dataMessage ={
  'dia' : data.getDate(),
  'mes' : data.getMonth(),
  'ano' : data.getYear(),
  'hora': data.getHours(),
  'min' : data.getMinutes() 
} 



userFrom.addEventListener('submit', e => {
  name = userInput.value
  e.preventDefault()
  if(userInput.value != ''){
  document.getElementById('chat').style.display = 'block'
  document.getElementById('pegaUser').style.display = 'none'
  appendMessage(`${name}`, ` : Você está conectado`, 'conectar')
  socket.emit('new-user', name)
  }
})



socket.on('chat-message', data => {
  appendMessage(`${data.name}`,`: ${data.message}`, 'newMessage')
  
})

socket.on('user-connected', name => {
  appendMessage(`${name}`,` Entrou na sala::.`, 'conectar')
})

socket.on('user-disconnected', name => {
  appendMessage(`${name}`,` .::Saiu da sala::.`, 'conectar')
})

// minha mensagem
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  if(messageInput.value != ''){
    const message = messageInput.value
    appendMessage(`${name}`,` : ${message}`, 'minhaMessage')
    socket.emit('send-chat-message', message)
    messageInput.value = ''
  }

})



function appendMessage(nome ,message,  classMessage) {
  const username = document.createElement('span')
  username.classList.add('nomeUser')

  const messageElement = document.createElement('div')
  const txtMessage = document.createElement('span')
  messageElement.classList.add(classMessage)

  const horarioElement = document.createElement('p')
  horarioElement.classList.add('hora')

  username.innerText = ` ${nome} `
  txtMessage.innerText = `${message}`
  horarioElement.innerText = ` ${dataMessage.dia}/${dataMessage.mes + 1}/${dataMessage.ano}  (${dataMessage.hora} :  ${dataMessage.min}) `

  messageContainer.append(messageElement)
  messageElement.appendChild(username)
  messageElement.appendChild(txtMessage)
  messageElement.appendChild(horarioElement)


  let scroll =  document.getElementById('message-container')
  let scrollTop = scroll.scrollTop
  let scrollMax = scroll.scrollHeight - scroll.offsetHeight
  let autoScroll = (scrollTop <= scrollMax)
   if(autoScroll){
     scroll.scrollTop = (scroll.scrollTop + scroll.offsetHeight)
     
   }
  
}


