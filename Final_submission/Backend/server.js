import http from 'http';
import app from './app.js' // need to load app.js routes
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(app)

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    });