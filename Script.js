document.addEventListener("DOMContentLoaded", () => {
  const openChat = document.getElementById("openChat");
  const closeChat = document.getElementById("closeChat");
  const chatWidget = document.getElementById("chatWidget");
  const chatOverlay = document.getElementById("chatOverlay");
  const sendMsg = document.getElementById("sendMsg");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  // Safety check (prevents JS errors)
  if (!openChat || !chatWidget) return;

  // Open chat
  openChat.addEventListener("click", () => {
    chatWidget.style.display = "flex";
    chatOverlay.style.display = "block";
    chatInput.focus();
  });

  // Close chat
  closeChat.addEventListener("click", closeChatFn);
  chatOverlay.addEventListener("click", closeChatFn);

  function closeChatFn() {
    chatWidget.style.display = "none";
    chatOverlay.style.display = "none";
  }

  // Send message
  sendMsg.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    // Mock AI response (replace later)
    setTimeout(() => {
      addMessage(
        "🤖 Thanks for reaching out! Our AI assistant will respond shortly.",
        "bot"
      );
    }, 600);
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-msg" : "bot-msg";
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
