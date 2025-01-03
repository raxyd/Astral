const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require("axios");
const app = express();
const port = 3000;
const request = require("request");
const WebSocket = require('ws');
const http = require('http');


app.get('/g', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'g.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'i.html'));
});

app.get('/:page', (req, res, next) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'public', `${page}.html`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        next();
    }
});

app.all("/games/*", (req, res) => {
    const targetUrl = req.url.replace("/games", "https://bvguchefnjimwondhxbygrfhuedijm.github.io/test/Assets");
    request(targetUrl).pipe(res);
});

// 404 fallback
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// WebSocket server setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, request) => {
    const path = request.url;
    if (path.startsWith("/proxy/")) {
        const targetUrl = path.replace("/proxy/", "");
        const ps = new WebSocket(targetUrl);
        const messageQueue = [];

        ps.on('open', () => {
            while (messageQueue.length > 0) {
                ps.send(messageQueue.shift());
            }
        });

        ws.on('message', (message) => {
            if (ps.readyState === WebSocket.OPEN) {
                ps.send(message);
            } else {
                messageQueue.push(message);
            }
        });

        ps.on('message', (event) => {
            ws.send(event.data);
        });

        ws.on('close', () => ps.close());
        ps.on('close', () => ws.close());
        ps.onerror = () => ws.close();
    }
});

// Utility functions
async function checkIfBlocked(url) {
    try {
        const { hostname } = new URL(url);
        const link = `https://useast-www.securly.com/crextn/broker?useremail=1726760@fcpsschools.net&reason=crextn&host=${hostname}&url=${btoa(url)}&msg=&ver=2.97.13&cu=https://useast-www.securly.com/crextn&uf=1&cf=1&lat=34.5678910&lng=-98.7654321`;
        const response = await axios.get(link);
        return response.data.includes("ALLOW");
    } catch (error) {
        console.error("CheckIfBlocked error:", error.message);
        return false;
    }
}

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
