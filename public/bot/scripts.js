const messageInput = document.querySelector('#user-input');
const conversationElem = document.querySelector('#conversation-container');


// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement('p');

  messageElem.classList.add('message', author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === 'user') messageInput.value = '';
  handleFocus();
};

let jokesMode = false


const sendMessage = (event) => {
  event.preventDefault();
  const message = { author: 'user', text: messageInput.value };

  updateConversation(message);
  
  let conversationDirection = ""
  
  if(jokesMode){
    conversationDirection = `/bot-jokes/?message=${message.text}`
  } else{
    conversationDirection = `/bot-message/?message=${message.text}`
  }

  
  fetch(conversationDirection)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if(data.message.text.includes('YES or NO')){
        jokesMode = true
      }
      if(data.message.text.includes('goodbye')){
        jokesMode = false
      }
      updateConversation(data.message);
    });
};

// call handleFocus on load
handleFocus();
