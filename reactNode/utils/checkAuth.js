// можно ли возвразять секретную информацию

import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, ""); // получение непосредствено токена убирая Bearer слово и заменить на пустую строку его
  if (token) {
    try {
      // расшифровка токена
      const decoded = jwt.verify(token, "secret123");

      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Нет доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нет доступа",
    });
  }
};
