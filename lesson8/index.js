// Введение в express
// Установка express npm i express

const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("this home page");
});
app.get('/user/:username/:id', (req,res)=>{
    res.send(`USER ID ${req.params.id}. Username ${req.params.username}`) //работа с динамическими адресами
})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server start: http://localhost:${PORT}`);
})