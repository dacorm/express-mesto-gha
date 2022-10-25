const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  INCORRECT_DATA_ERROR_CODE, JWT_SECRET
} = require('../utils/constants');

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось получить пользователей',
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(NOT_FOUND_ERROR_CODE).json({
        message: 'Пользователь не найден',
      });
    }

    res.send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Переданы не валидные данные'
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось найти пользователя',
    });
  }
};



module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = User.create({
      name,
      about,
      avatar,
      email,
      password: hash
    });
    res.send({
      message: 'Пользователь успешно создан',
    });
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Переданы не валидные данные'
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось создать пользователя',
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(email, password);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.send(token);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Переданы не валидные данные'
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось войти в систему',
    });
  }
}

module.exports.updateUserName = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Переданы не валидные данные'
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось изменить пользователя',
    });
  }
};

module.exports.updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(updatedUser);
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Переданы не валидные данные'
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось изменить пользователя',
    });
  }
};
