const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const auth = require('./middlewares/auth');
const { errors } = require('celebrate');
const errorsHandler = require('./middlewares/errorHandler');
const { validateLogin, validateRegister } = require('./utils/validators/userValidator');
const {login, createUser} = require("./controllers/user");
const NotFoundError = require("./utils/errors/notFoundError");

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/mestodb');


app.post('/signin', validateLogin, login);
app.post('/signup', validateRegister, createUser);

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('*', () => {
  throw new NotFoundError('Запрашиваемый адрес не найден. Проверьте URL и метод запроса');
});
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
