import express from 'express';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'i.html'));
});

app.get('/g', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'g.html'));
});

app.get('/s', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 's.html'));
});

app.get('/a', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'a.html'));
});

app.get('/p', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'p', 'reading', 'index.html'));
});

app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
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

app.use((req, res) => {
    res.redirect('/404');
  });
  
  app.get('/404', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
