const http = require('http');
const app = require('./app');
 
const server = http.createServer(app);
 
console.log("Server Started");
 
server.listen(5001, 'test-83y6.onrender.com')
