const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require("axios");
const app = express();
const port = 3000;
const request = require("request");
const WebSocket = require('ws');
const http = require('http');
var unblockedUrls = [];
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'i.html'));
});
app.get('/unblockedUrls', async (req, res) => {
    var url = `${req.protocol}://${req.get('host')}${req.originalUrl}`
    if(checkIfBlocked(url)){
        if(!unblockedUrls.includes(url)) unblockedUrls.push(url);
    } else if (unblockedUrls.includes(url)){
        unblockedUrls = unblockedUrls.filter(item => item !== url);
    }
    res.send(unblockedUrls.join("\n"));
})
app.get('/g', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'g.html'));
});
app.get('/:page', (req, res, next) => {
    var page = req.params.page;
    var filePath = path.join(__dirname, 'public', `${page}.html`);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        next();
    }
});
app.all("/games/*", (req, res) => {
    request(req.url.replace("/games", "https://bvguchefnjimwondhxbygrfhuedijm.github.io/test/Assets")).pipe(res);
})
app.use((req, res) => {
    res.status(404).send('Page not found');
});
var server = http.createServer(app);
var wss = new WebSocket.Server({ server });
wss.on('connection', (ws, request) => {
    var path = request.url;
    if (path.startsWith("/proxy/")) {
        var targetUrl = path.replace("/proxy/", "");
        var ps = new WebSocket(targetUrl);
        var open = false;
        var messageQueue = [];
        async function sendMessage(message){
            messageQueue.push(message);
            if(open){
                if(messageQueue[0] == message){
                    ps.send(message);
                } else {
                    ps.send(messageQueue[0]);
                }
                messageQueue = messageQueue.slice(1);
            } else{
                await wait(100);
                sendMessage(message);
            }
        }
        ps.onopen = () => {
            open = true;
        };
        ws.on('message', async (message) => {
            sendMessage(message);
        });
        ps.onmessage = (event) => {
            ws.send(event.data);
        };
        ws.on('close', () => {
            ps.close();
        });
        ps.onclose = () => {
            ws.close();
        };
        ws.onerror = (error) => {
            ps.close();
        };
        ps.onerror = (error) => {
            ws.close();
        };
    }
});

server.listen(3000, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function checkIfBlocked(url){
    var urlHost = url.hostname;
    var link = `https://useast-www.securly.com/crextn/broker?useremail=1726760@fcpsschools.net&reason=crextn&host=${urlHost}&url=${btoa(url)}&msg=&ver=2.97.13&cu=https://useast-www.securly.com/crextn&uf=1&cf=1&lat=34.5678910&lng=-98.7654321`;
    var response = await axios.get(link);
    return response.data.includes("ALLOW");
}
