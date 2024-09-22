const http = require('http');
const os = require('os');

console.log("K8sDemo server starting...");

var requestCount = 0;

const PORT = 8080; // 将端口号提取为变量

const handler = (request, response) => {
  console.log(`Received request from ${request.connection.remoteAddress}`);
  requestCount++;
  if(requestCount > 30){
    request.writeHead(500);
    response.end("I'm not well. Please restart me!");
    return;
  }
  response.writeHead(200);
  response.end(`You've hit ${os.hostname()}\n`);
};

const www = http.createServer(handler);

www.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error(err);
  }
});

