require('dotenv').config();
const app = require('./api');
const loginRoute = require('./routes/login');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));

app.use('/login', loginRoute);

app.use((err, _req, res, next) => {
  console.log(err);
  res.status(500).json({ message: 'Erro no servidor!' });
  next(err);
});