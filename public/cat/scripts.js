// here there be JS, yarrr ☠️

const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");
const handleFocus = () => {
    messageInput.focus();
  };
const updateConversation = (message) => {
    // deconstruct the message object
    const { author, text } = message;
// create a <p> element
    const messageElem = document.createElement("p");
// add the text message to the element
    messageElem.innerHTML = `<span>${text}</span>`;
// append the element to the conversation
    messageElem.classList.add("message", author);  
     
    conversationElem.appendChild(messageElem);
    conversationElem.scrollTop = conversationElem.scrollHeight;
    if (author === "user") {
        messageInput.value = "";
      }
    handleFocus();
  };
const sendMessage = (event) => {
    // prevent the default "page reload" from occurring.
    event.preventDefault();
    
    const message = { author: "user", text: messageInput.value };
    updateConversation(message)
    fetch("/cat-message")
        .then((res) => res.json())
        .then((data) => {
            updateConversation(data.message);
        });
  
    
  };
  handleFocus();