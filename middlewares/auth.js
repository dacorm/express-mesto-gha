const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const {NOT_FOUND_ERROR_CODE} = require("../utils/constants");

module.exports = (req, res, next) => {
  let payload;
  try {
  const token = req.header('token');
  if (!token) {
    return res.status(NOT_FOUND_ERROR_CODE).json({
      message: 'Необходима авторизация',
    });
  }
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return res.status(NOT_FOUND_ERROR_CODE).json({
      message: 'Необходима авторизация',
    });
  }
  req.user = payload;
  next();
};