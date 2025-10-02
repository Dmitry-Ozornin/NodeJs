const fs = require("fs");

// fs.mkdir('text-files', () => {
//     fs.writeFile('./text-files/some.txt', 'Hello', () => {})
// });
// fs.mkdir('text-files', () => {}) // создание папки

fs.unlink("./text-files/some.txt", () => {
  fs.rmdir("./text-files", ()=>{}) ;
}); // удаление файла и папки, если папка не пуста , не удалиться
