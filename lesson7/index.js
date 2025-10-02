// создание сервера и показ html страницы

const http = require("http");
const fs = require("fs");

// let server = http.createServer((req, res) => {
//     res.writeHead(200,{"content-type": "text/plain; charset=utf-8"})
//     res.end("Hello NODE JS") // вывод на странице
// });

let server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  if (req.url == "/") {
    fs.createReadStream("./templates/index.html").pipe(res);
  } else if (req.url == "/about") {
    fs.createReadStream("./templates/about.html").pipe(res);
  } else {
    fs.createReadStream("./templates/error.html").pipe(res);
  }

  // const stream = fs.createReadStream("./templates/index.html"); //чтение файла
  // stream.pipe(res)  //отправка информации на сервер сразу
});

let PORT = 3000; //порт
const HOST = "localhost"; // url адрес
server.listen(PORT, HOST, () => {
  console.log(`сервер запущен: http://${HOST}:${PORT}`);
});
