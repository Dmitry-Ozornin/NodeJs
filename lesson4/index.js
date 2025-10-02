const { error } = require("console");
const fs = require("fs");

let result = fs.readFileSync("some.txt", "utf-8"); // прочитать файл
fs.writeFileSync("some.txt", "Hello World"); // открывает файл, стирает  и записывает новый текст
fs.writeFileSync('some.txt', result + "\nHello World") // открывает, дозаписывает , не стирая предыдущее
console.log(result);

let result2 = fs.readFile("some.txt", "utf-8", (error,data) => {
    fs.writeFile("some.txt", data + "\nSome text", (error, data)=> {
        console.log("все сработало");
    }); // асинхронный подход, не тормозит выполение кода
}); // асинхронный подход, не тормозит выполение кода
// fs.writeFile("some.txt", "Hello World"); // асинхронный подход, не тормозит выполение кода

