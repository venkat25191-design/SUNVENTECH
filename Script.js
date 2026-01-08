const openChat = document.getElementById("openChat");
const closeChat = document.getElementById("closeChat");
const chatWidget = document.getElementById("chatWidget");
const chatOverlay = document.getElementById("chatOverlay");
const sendMsg = document.getElementById("sendMsg");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

openChat.onclick = () => {
  chatWidget.style.display = "flex";
  chatOverlay.style.display = "block";
};

closeChat.onclick = () => {
  chatWidget.style.display = "none";
  chatOverlay.style.display = "none";
};

sendMsg.onclick = () => {
  const text = chatInput.value.trim();
  if (!text) return;

  // User message
  const userDiv = document.createElement("div");
  userDiv.textContent = text;
  userDiv.style.textAlign = "right";
  userDiv.style.marginBottom = "10px";
  chatMessages.appendChild(userDiv);

  chatInput.value = "";

  // Fake AI response
  setTimeout(() => {
    const botDiv = document.createElement("div");
    botDiv.className = "bot-msg";
    botDiv.textContent =
      "Thanks for reaching out! Our team will connect with you shortly.";
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);
};
