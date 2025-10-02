//создание сервера на базе Node js

const http = require("http");

// let server = http.createServer((req, res) => {
//     res.writeHead(200,{"content-type": "text/plain; charset=utf-8"})
//     res.end("Hello NODE JS") // вывод на странице
// });

let server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NodeJS</title>
</head>
<body>
    <h1>HELLO WORLD</h1>
</body>
</html>`); // вывод на странице
});

let PORT = 3000; //порт
const HOST = "localhost"; // url адрес
server.listen(PORT, HOST, () => {
  console.log(`сервер запущен: http://${HOST}:${PORT}`);
});
