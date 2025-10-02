// создаем валидацию

import { body } from "express-validator";

// валидация пользователя
export const loginValidator = [
  body("email", "неверный формат ввода почты").isEmail(), //валидация емаил
  body("password", "пароль должен быть минимум 5 символов").isLength({ min: 5 }), //валидация пароля
];

export const registerValidator = [
  body("email", "неверный формат ввода почты").isEmail(), //валидация емаил
  body("password", "пароль должен быть минимум 5 символов").isLength({ min: 5 }), //валидация пароля
  body("fullName", "укажите имя").isLength({ min: 3 }),
  body("avatarUrl", "неверная ссылка на аватарку").optional().isURL(),
];

// валидация статьи

export const postCreateValidator = [
  body("title", "Введите заголовок").isLength({ min: 3 }).isString(), //валидация емаил
  body("text", "Введите текст статьи").isLength({ min: 10 }).isString(), //валидация пароля
  body("tags", "Неверный формат тегов(укажите массив").optional().isString(),
  body("imageUrl", "неверная ссылка на изображение").optional().isString(),
];
