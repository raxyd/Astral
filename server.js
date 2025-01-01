const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require("axios");
const app = express();
const port = 3000;
const request = require("request");
const WebSocket = require('ws');
const http = require('http');

// Use environment variables for sensitive data
const encryptionpassword = process.env.ENCRYPTION_PASSWORD || 'raxisthebestidkveryweirdpassword123';

// Helpers for Base64 encoding/decoding
const btoa = (str) => Buffer.from(str, 'binary').toString('base64');
const atob = (str) => Buffer.from(str, 'base64').toString('binary');

let unblockedUrls = [];
const urls = [
    "https://therealastral.astraltech.org",
    "https://sneaky.spynick.com",
    "https://feltcutemightdeletelater.mapadeloscomedores.com",
    "http://localhost:" + port
];

// Middleware to check redirection logic
app.use(async (req, res, next) => {
    if(!(req.url == "/unblockedUrls" || req.url.includes("/append"))){
    try {
        const response = await axios.get(`https://therealastral.astraltech.org/append?password=${encryptionpassword}&url=${btoa(`${req.protocol}://${req.get('host')}`)}`);
        if (response.data.includes(req.get("host"))) {
            next();
        } else {
            const urlsList = response.data.split("\n").filter(Boolean);
            if (urlsList.length === 0) {
                res.redirect(urls[Math.floor(Math.random() * urls.length)]);
            } else {
                res.redirect(urlsList[Math.floor(Math.random() * urlsList.length)]);
            }
        }
    } catch (error) {
        console.error("Redirection middleware error:", error.message);
        res.status(500).send("Internal Server Error: " + error.message);
    }
    } else{
        next();
    }
});

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'i.html'));
});

app.get('/unblockedUrls', (req, res) => {
    res.send(unblockedUrls.join("\n"));
});

app.get('/append', async (req, res, next) => {
    try {
        let { password, url } = req.query;
        url = atob(url);
        if (password === encryptionpassword) {
            if (await checkIfBlocked(url)) {
                if (!unblockedUrls.includes(url)) unblockedUrls.push(url);
            } else if (unblockedUrls.includes(url)) {
                unblockedUrls = unblockedUrls.filter(item => item !== url);
            }
            res.send(unblockedUrls.join("\n"));
        } else {
            res.status(403).send("Forbidden");
        }
    } catch (error) {
        console.error("Append route error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/g', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'g.html'));
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
