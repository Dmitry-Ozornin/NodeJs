// создали отдельный файл с функциями

import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {

// шифрование пароля
   const password = req.body.password
   const salt = await bcrypt.genSalt(10);
   const hash = await bcrypt.hash(password, salt);

   const doc = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl:req.body.avatarUrl,
    passwordHash: hash,
   })

   const user = await doc.save();
   res.json(user)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email }); //поиск пользователя
    if (!user) {
      return res.status(404).json({
        message: "пользователь не найден", // в реальном проекте нельзя писать конкретику, просто пишем неверноый логин или пароль
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash); //проверка пароля

    if (!isValidPass) {
      return res.status(404).json({
        message: "неверный логин или пароль",
      });
    }

    const token = await jwt.sign(
      // создаем новый токен
      {
        //шифрование информации
        _id: user._id,
      },
      "secret123", // ключ для шифрования токена
      {
        expiresIn: "30d", // сколько будет жить токен
      },
    );

    const { passwordHash, ...userData } = user._doc; //вытаскиваем пароль и изера, путем деструктаризации

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  //может ли пользователь получить информацию о себе
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "пользователь не найден",
      });
    }
    const { passwordHash, ...userData } = user._doc; //вытаскиваем пароль и изера, путем деструктаризации

    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "нет доступа",
    });
  }
};
