const form = document.getElementById("guestbook-form");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const messagesList = document.getElementById("messages-list");

async function loadMessages() {
  try {
    const response = await fetch("/api/messages");
    const messages = await response.json();
    renderMessages(messages);
  } catch (error) {
    console.error("Failed to load messages:", error);
  }
}

function renderMessages(messages) {
  if (messages.length === 0) {
    messagesList.innerHTML =
      '<li class="empty-state">No messages yet. Be the first to sign!</li>';
    return;
  }

  messagesList.innerHTML = messages
    .slice()
    .reverse()
    .map(
      (msg) => `
        <li>
          <div class="message-author">${escapeHtml(msg.name)}</div>
          <div class="message-text">${escapeHtml(msg.message)}</div>
        </li>
      `
    )
    .join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) return;

  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message }),
    });

    if (!response.ok) {
      throw new Error("Failed to save message");
    }

    nameInput.value = "";
    messageInput.value = "";
    await loadMessages();
  } catch (error) {
    console.error("Failed to send message:", error);
    alert("Could not save your message. Please try again.");
  }
});

loadMessages();
