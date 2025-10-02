// Получение и обработка данных от пользователя
// необходимо установить доп библиотеку npm i body-parser
const express = require("express");

const app = express();
app.use(express.urlencoded({extended: false})) //подключение body-parser, корректное получение данных из формы
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.get("/", (req, res) => {
    res.render('index')
});
app.get('/user/:username', (req,res)=>{
    let data = {username: req.params.username}
    res.render('user', data) //работа с динамическими адресами
})


// получение данных 
app.post('/post', (req,res)=>{
    let username = req.body.username;
    
    if(username == ""){ //проверяем на пустоту и если пустое поле, то переадресовываем на начальную страницу
        return res.redirect('/')
    } else{ //переадресовываем на станицу user и подставляем имя пользователя
        return res.redirect('/user/' + username)
    }
})
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server start: http://localhost:${PORT}`);
});

