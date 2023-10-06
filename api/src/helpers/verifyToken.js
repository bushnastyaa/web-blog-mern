import jwt from "jsonwebtoken";
import createError from 'http-errors';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};
