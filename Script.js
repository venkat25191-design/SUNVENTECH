document.addEventListener("DOMContentLoaded", () => {
  const openChat = document.getElementById("openChat");
  const closeChat = document.getElementById("closeChat");
  const chatWidget = document.getElementById("chatWidget");
  const chatOverlay = document.getElementById("chatOverlay");
  const sendMsg = document.getElementById("sendMsg");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  if (!openChat || !chatWidget) return;

  openChat.addEventListener("click", () => {
    chatWidget.style.display = "flex";
    chatOverlay.style.display = "block";
    chatInput.focus();
  });

  closeChat.addEventListener("click", closeChatFn);
  chatOverlay.addEventListener("click", closeChatFn);

  function closeChatFn() {
    chatWidget.style.display = "none";
    chatOverlay.style.display = "none";
  }

  sendMsg.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
      const reply = getBotReply(text);
      addMessage(reply, "bot");
    }, 500);
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-msg" : "bot-msg";
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // 🔹 RULE-BASED LOGIC
  function getBotReply(input) {
    const msg = input.toLowerCase();

    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return "👋 Hello! Welcome to SunvenTech. How can I help you today?";
    }

    if (msg.includes("how are you")) {
      return "😊 I’m doing great! How can I assist you today?";
    }

    if (msg.includes("service")) {
      return "💼 We offer Web & App Development, Enterprise Software, IT Consulting, and Cloud Automation.";
    }

    if (msg.includes("about")) {
      return "🏢 SunvenTech builds future-ready digital solutions using modern, scalable technology.";
    }

    if (msg.includes("contact") || msg.includes("email")) {
      return "📧 You can contact us at sakthipria@gmail.com";
    }

    if (msg.includes("price") || msg.includes("cost")) {
      return "💬 Pricing depends on project scope. Please share your requirement or contact us via email.";
    }

    return "🤖 I’m here to help! You can ask about our services, company, or contact details.";
  }
});
