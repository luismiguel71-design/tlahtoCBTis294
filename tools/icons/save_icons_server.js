const http = require('http');
const fs = require('fs');
const path = require('path');

const iconsDir = path.resolve(__dirname, '..', '..', 'apps', 'web', 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/save-icon') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const { filename, dataUrl } = JSON.parse(body);
                const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
                const filePath = path.join(iconsDir, filename);
                fs.writeFileSync(filePath, base64Data, 'base64');
                console.log(`Saved ${filename} (${fs.statSync(filePath).size} bytes)`);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, filename }));
            } catch (err) {
                console.error('Save error:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
            }
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

server.listen(8099, () => {
    console.log('Icon save server listening on http://localhost:8099');
});
