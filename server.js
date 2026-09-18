const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT === undefined ? 4173 : Number(process.env.PORT);
const root = path.resolve(__dirname, 'dist');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const server = http.createServer((request, response) => {
  const send = (status, content, headers = {}) => {
    response.writeHead(status, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': Buffer.byteLength(content),
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-cache',
      ...headers,
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    send(405, 'Method not allowed', { Allow: 'GET, HEAD' });
    return;
  }

  let requested;
  try {
    requested = decodeURIComponent((request.url || '/').split('?')[0]);
  } catch {
    send(400, 'Bad request');
    return;
  }

  if (!requested.startsWith('/') || /[\0:]/.test(requested)) {
    send(400, 'Bad request');
    return;
  }

  if (requested.endsWith('/')) requested += 'index.html';
  const file = path.resolve(root, `.${requested}`);
  const relative = path.relative(root, file);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    send(403, 'Forbidden');
    return;
  }

  fs.readFile(file, (error, content) => {
    if (error) {
      const missing = ['ENOENT', 'ENOTDIR', 'EISDIR'].includes(error.code);
      send(missing ? 404 : 500, missing ? 'Not found' : 'Server error');
      return;
    }
    send(200, content, {
      'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
    });
  });
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} is already in use. Stop the existing preview or set PORT to another port.`
    : `Could not start the preview: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Morrow One is ready at http://localhost:${port}`);
});
