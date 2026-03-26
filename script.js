const form = document.getElementById('guestbook-form');
const entriesDiv = document.getElementById('entries-container');

// Function to fetch and show messages
async function loadMessages() {
    const response = await fetch('/api/messages');
    const data = await response.json();
    entriesDiv.innerHTML = data.map(entry => `
        <div style="border-bottom: 1px solid #eee; padding: 10px;">
            <strong>${entry.name}</strong>: ${entry.message} <br>
            <small>${entry.date}</small>
        </div>
    `).join('');
}

// Handle Form Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message })
    });

    form.reset();
    loadMessages(); // Refresh the list
});

loadMessages(); // Load on page start