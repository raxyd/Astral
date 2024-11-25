const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'i.html'));
});

// Dynamic route handler to append .html if the file exists
app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', `${page}.html`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        next(); // Pass to the next route handler if the file doesn't exist
    }
});

// Fallback to handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

var request = require("request");

app.all("games/", (req, res) => {
  request(req.url.replace("/games", "https://bvguchefnjimwondhxbygrfhuedijm.github.io/test/Assets")).pipe(res);
})