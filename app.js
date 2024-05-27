const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./src/infrastructure/database/database');
const authRoutes = require('./src/infrastructure/routes/authRoutes');

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.use(authRoutes);

app.get('/', (req, res) => {
  if (req.session.user) {
    res.render('index', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.log('Error connecting to the database:', err);
});
