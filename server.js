const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON bodies
app.use(express.static('public')); // Serve your HTML/CSS from a 'public' folder

let guestbookEntries = []; // Temporary "database" (use MySQL/PostgreSQL for production)

// Route to get all messages
app.get('/api/messages', (req, res) => {
    res.json(guestbookEntries);
});

// Route to post a new message
app.post('/api/messages', (req, res) => {
    const { name, message } = req.body;
    const newEntry = { name, message, date: new Date().toLocaleString() };
    guestbookEntries.unshift(newEntry); // Add to the start of the list
    res.status(201).json(newEntry);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
