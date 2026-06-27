document.addEventListener("DOMContentLoaded", () => {

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });
  }

  /* ===== HAMBURGER MENU ===== */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    document.querySelectorAll(".mobile-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });
  }

  /* ===== SCROLL TO TOP ===== */
  const scrollTopBtn = document.getElementById("scrollTop");
  if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ===== INTERSECTION OBSERVER — animate on scroll ===== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".animate-up").forEach(el => observer.observe(el));


  /* ===== CHAT WIDGET ===== */
  const chatFab   = document.getElementById("chatFab");
  const openChat  = document.getElementById("openChat");
  const closeChat = document.getElementById("closeChat");
  const chatWidget = document.getElementById("chatWidget");
  const sendMsg    = document.getElementById("sendMsg");
  const chatInput  = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  function openChatFn() {
    chatWidget.classList.add("open");
    chatFab && chatFab.classList.add("open");
    setTimeout(() => chatInput && chatInput.focus(), 300);
  }

  function closeChatFn() {
    chatWidget.classList.remove("open");
    chatFab && chatFab.classList.remove("open");
  }

  if (chatFab) {
    chatFab.addEventListener("click", () => {
      chatWidget.classList.contains("open") ? closeChatFn() : openChatFn();
    });
  }

  if (openChat) openChat.addEventListener("click", openChatFn);
  if (closeChat) closeChat.addEventListener("click", closeChatFn);

  if (sendMsg) {
    sendMsg.addEventListener("click", sendMessage);
    chatInput && chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }

  function sendMessage() {
    if (!chatInput) return;
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    const typing = addMessage("…", "bot");
    setTimeout(() => {
      typing.textContent = getBotReply(text);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-msg" : "bot-msg";
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return msg;
  }

  function getBotReply(input) {
    const msg = input.toLowerCase();

    if (msg.match(/\b(hi|hello|hey|howdy)\b/))
      return "👋 Hello! Welcome to SunvenTech. How can I help you today?";

    if (msg.includes("how are you"))
      return "😊 I'm doing great! Ready to help you with anything SunvenTech related.";

    if (msg.match(/\b(service|offer|do|provide)\b/))
      return "💼 We offer Web & App Development, Enterprise Software, IT Consulting, Cloud & Automation, AI & Data Solutions, and Cybersecurity. Which interests you?";

    if (msg.includes("about") || msg.includes("who are you"))
      return "🏢 SunvenTech builds future-ready digital solutions using modern, scalable technology. We partner with businesses worldwide to transform ideas into powerful digital experiences.";

    if (msg.match(/\b(contact|email|reach|touch)\b/))
      return "📧 You can reach us at sunventechnology@gmail.com — or fill out the contact form on this page!";

    if (msg.match(/\b(price|cost|quote|budget|rate)\b/))
      return "💬 Pricing depends on project scope and requirements. Share your project details via the contact form and we'll get back to you with a tailored quote!";

    if (msg.match(/\b(web|app|mobile|website)\b/))
      return "🖥️ We build high-performance web and mobile applications using modern frameworks like React, Vue, Node.js, and more. Want to discuss your project?";

    if (msg.match(/\b(cloud|aws|azure|devops)\b/))
      return "☁️ We specialize in cloud infrastructure on AWS, Azure, and GCP — including DevOps pipelines, auto-scaling, and cost optimization.";

    if (msg.match(/\b(ai|machine learning|ml|data)\b/))
      return "🤖 Our AI & Data team builds ML-powered features, data pipelines, and intelligent automation systems. Very exciting stuff!";

    if (msg.match(/\b(thank|thanks|great|awesome|perfect)\b/))
      return "🙌 You're very welcome! Is there anything else I can help you with?";

    return "🤖 I'm here to help! You can ask about our services, pricing, team, or how to get started. Or use the contact form to reach us directly.";
  }

  /* ===== CONTACT FORM ===== */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector("button[type=submit]");
      const original = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = "Sent! We'll be in touch ✓";
        btn.style.background = "linear-gradient(135deg, #10b981, #059669)";
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = "";
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }, 1200);
    });
  }

});
