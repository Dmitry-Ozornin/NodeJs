// создаем package.json
// подключает библиотеку express npm i express
// чтобы использовать import , необходимо в package.json и указать type: module
// установка библеотеки npm i nodemon , чтобы автоматически перезапускать приложение при изменениях. Также в packege.json прописсываем "команду": "nodemon index.js", сервер запускаем командой npm run "команда"
// библиотека для генирации токенов для доступа к приватной информации, установить библиотеку npm i jsonwebtoken
// библеотека mongoose для работы с mongoDB , npm install mongoose
// валидация, npm i express-validator
// библиотека для шифрования пароля npm i bcrypt
// блилиотека для загрузки файлов npm i multer

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { registerValidator, loginValidator, postCreateValidator } from "./validations/auth.js";
import checkAuth from "./utils/checkAuth.js";
import { register, login, getMe } from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";

const app = express(); // создаем приложение express

// создаем хранилище картинок
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static("uploads")); // чтобы считывал статичные файлы

mongoose
  .connect("mongodb+srv://ozornindimitry:wwwwww@cluster0.kjjo2rq.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0") //подключения базы данных
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));
app.use(express.json()); // необходимо чтобы можно было считывать json

// app.get("/", (req, res) => {
//   // получения запроса
//   res.send("увуву Hello world");
// });

//делаем авторизацию
app.post("/auth/login", loginValidator, handleValidationErrors, login);

// делаем регистрацию
app.post("/auth/register", registerValidator, handleValidationErrors, register);

app.get("/auth/me", checkAuth, getMe);

//работа со статьями, checkAuth ограничивает доступ к удалению, созданию и редактированию статей
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidator,handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidator,handleValidationErrors, PostController.update);

//работа с хранилищем
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server started");
  }
});
