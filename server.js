const express = require('express');
const path = require('path');
const fs = require('fs');
const axios = require("axios");
const app = express();
const port = 3000;
const request = require("request");
const WebSocket = require('ws');
const http = require('http');
const blockedCategories = [
      "porn",
      "porn.illicit",
      "security.malware",
      "security",
      "security.proxy",
      "forums",
      "games",
      "adult",
      "mature",
      "facebook",
      "suspicous",
      "warez.security",
      "security.nettools",
      "plagiarism",
      "Blocked - Student",
      "Block - Temporary Test",
      "security.domain-sharing",
    ];
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, "categories.json"), 'utf8'));
// Use environment variables for sensitive data
const encryptionpassword = process.env.ENCRYPTION_PASSWORD || 'raxisthebestidkveryweirdpassword123';

// Helpers for Base64 encoding/decoding
const btoa = (str) => Buffer.from(str, 'binary').toString('base64');
const atob = (str) => Buffer.from(str, 'base64').toString('binary');

let unblockedUrls = [];
let unblockedUrls2 = [];
const urls = [
    "https://therealastral.astraltech.org",
    "https://sneaky.spynick.com",
    "https://feltcutemightdeletelater.mapadeloscomedores.com",
    "https://to.madhavkhanal.com.np",
    "https://therealastral.h0rst.us"
];

// Middleware to check redirection logic
app.use(async (req, res, next) => {
    await axios.get(`https://therealastral.astraltech.org/append2?password=${encryptionpassword}&url=${btoa(`${req.protocol}://${req.get('host')}`)}`)
    if(req.query.blocker){
        if(req.query.blocker == "securly"){
                try {
        const response = await axios.get(`https://therealastral.astraltech.org/append?password=${encryptionpassword}&blocker=securly&url=${btoa(`${req.protocol}://${req.get('host')}`)}`);
        if (response.data.includes(req.get("host"))) {
            next();
        } else {
            const urlsList = response.data.split("\n").filter(Boolean);
            if (urlsList.length === 0) {
                res.redirect(urls[Math.floor(Math.random() * urls.length)] + "?blocker=securly");
            } else {
                res.redirect(urlsList[Math.floor(Math.random() * urlsList.length)] + "?blocker=securly");
            }
        }
    } catch (error) {
        console.error("Redirection middleware error:", error.message);
        res.status(500).send("Internal Server Error: " + error.message);
    }
        } else if (req.query.blocker == "lightspeed"){
                            try {
        const response = await axios.get(`https://therealastral.astraltech.org/append?password=${encryptionpassword}&blocker=lightspeed&url=${btoa(`${req.protocol}://${req.get('host')}`)}`);
        if (response.data.includes(req.get("host"))) {
            next();
        } else {
            const urlsList = response.data.split("\n").filter(Boolean);
            if (urlsList.length === 0) {
                res.redirect(urls[Math.floor(Math.random() * urls.length)] + "?blocker=lightspeed");
            } else {
                res.redirect(urlsList[Math.floor(Math.random() * urlsList.length)] + "?blocker=lightspeed");
            }
        }
    } catch (error) {
        console.error("Redirection middleware error:", error.message);
        res.status(500).send("Internal Server Error: " + error.message);
    }
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
            var bool = true;
            if(req.query.blocker == "lightspeed"){
                bool = await checkIfBlocked2(url);
            if (bool) {
                if (!unblockedUrls2.includes(url)) unblockedUrls2.push(url);
            } else if (unblockedUrls2.includes(url)) {
                unblockedUrls2 = unblockedUrls2.filter(item => item !== url);
            }
            res.send(unblockedUrls.join("\n"));
            }
            if(req.query.blocker == "securly"){
                bool = await checkIfBlocked(url);
            if (bool) {
                if (!unblockedUrls.includes(url)) unblockedUrls.push(url);
            } else if (unblockedUrls.includes(url)) {
                unblockedUrls = unblockedUrls.filter(item => item !== url);
            }
            res.send(unblockedUrls.join("\n"));
            }
        } else {
            res.status(403).send("Forbidden");
        }
    } catch (error) {
        console.error("Append route error:", error.message);
        res.status(500).send("Internal Server Error");
    }
});
app.get('/append2', async (req, res, next) => {
      if(req.query.password == encryptionpassword){
            if(!urls.include(atob(req.query.url))){
                  urls.push(atob(req.query.url));
            }
      } else {
            next();
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
async function checkIfBlocked2(website){
    var url = new URL(website);
            try {
          var response = await axios.post(
            "https://production-archive-proxy-api.lightspeedsystems.com/archiveproxy",
            {
              query:
                "\nquery getDeviceCategorization($itemA: CustomHostLookupInput!, $itemB: CustomHostLookupInput!){\n  a: custom_HostLookup(item: $itemA) {\n    request {\n      host\n    }\n    cat\n    action\n    source_ip\n    archive_info {\n      filter {\n        category\n        transTime\n        reason\n        isSafetyTable\n        isTLD\n      }\n      rocket {\n        category\n      }\n    }\n  }\n  b: custom_HostLookup(item: $itemB) {\n    request {\n      host\n    }\n    cat\n    action\n    source_ip\n    archive_info {\n      filter {\n        category\n        transTime\n        reason\n      }\n      rocket {\n        category\n      }\n    }\n  }\n}",
              variables: {
                itemA: {
                  hostname: url.hostname,
                  getArchive: true,
                },
                itemB: {
                  hostname: url.hostname,
                  getArchive: true,
                },
              },
            },
            {
              headers: {
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                dnt: "1",
                origin: "https://archive.lightspeedsystems.com",
                pragma: "no-cache",
                priority: "u=1, i",
                "sec-ch-ua":
                  '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "user-agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                "x-api-key": "onEkoztnFpTi3VG7XQEq6skQWN3aFm3h",
              },
            }
          );
          const category = categories[response.data["data"]["a"]["cat"]];
          return blockedCategories.includes(category);
        } catch (e) {
          if (e.message.includes("Request failed with status code 406")) {
            return true;
          } else {
            return checkIfBlocked2(website);
          }
        }
}
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
