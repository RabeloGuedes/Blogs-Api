require('dotenv').config();
const app = require('./api');
const loginRoute = require('./routes/login');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category');
const error = require('./middlewares/error');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));

app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);

app.use(error.errorHandler);