const messages = document.querySelector('#messages');
const form = document.querySelector('#chatForm');
const input = document.querySelector('#messageInput');
const clearButton = document.querySelector('#clearButton');

function addMessage(text, type = 'bot') {
  const row = document.createElement('div');
  row.className = `message-row ${type}`;
  if (type === 'bot') {
    const avatar = document.createElement('div');
    avatar.className = 'bot-avatar';
    avatar.textContent = 'G+';
    row.appendChild(avatar);
  }
  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const row = document.createElement('div');
  row.id = 'typing-row';
  row.className = 'message-row';
  row.innerHTML = '<div class="bot-avatar">G+</div><div class="message-bubble typing"><i></i><i></i><i></i></div>';
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() { document.querySelector('#typing-row')?.remove(); }

async function sendMessage(value) {
  const text = value.trim();
  if (!text) { input.focus(); return; }
  addMessage(text, 'user');
  input.value = '';
  showTyping();
  try {
    const response = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: text }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    window.setTimeout(() => { hideTyping(); addMessage(data.reply); input.focus(); }, 420);
  } catch (error) {
    hideTyping();
    addMessage('I could not connect right now. Please try again or visit the official GMIU website.');
  }
}

function showWelcome() {
  if (!messages.children.length) addMessage('Hello! I am the GMIU College Chatbot. Ask about programs, admissions, campus facilities, placements, or contact details.');
}

form.addEventListener('submit', (event) => { event.preventDefault(); sendMessage(input.value); });
clearButton.addEventListener('click', () => { messages.replaceChildren(); showWelcome(); input.focus(); });
document.querySelectorAll('.topic-chip').forEach((chip) => chip.addEventListener('click', () => sendMessage(chip.dataset.message)));
showWelcome();
