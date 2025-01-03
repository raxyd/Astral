const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

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
    "https://to.madhavkhanal.com.np",
    "https://therealastral.h0rst.us"
];

// Middleware to check redirection logic
app.use(async (req, res, next) => {
    if (!req.url) {
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
    } else {
        next();
    }
});

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'i.html'));
});

app.get('/g', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'g.html'));
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
