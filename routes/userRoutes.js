const userRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
} = require('../controllers/user');

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateUser);

module.exports = userRoutes;
