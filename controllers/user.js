const User = require('../models/user');
const {
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find({});

    if (!user) {
      return res.status(NOT_FOUND_ERROR_CODE).json({
        message: 'Пользователи не найдены',
      });
    }

    res.send(user);
  } catch (e) {
    console.log(e);
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
    console.log(e);
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось найти пользователя',
    });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = User.create({ name, about, avatar });
    res.send({
      message: 'Пользователь успешно создан',
    });
  } catch (e) {
    console.log(e);
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось создать пользователя',
    });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      {
        new: true,
      },
    );
    res.send(updatedUser);
  } catch (e) {
    console.log(e);
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Не удалось изменить пользователя',
    });
  }
};
