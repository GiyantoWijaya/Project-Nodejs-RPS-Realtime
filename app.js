const { urlencoded } = require('express');
const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const main = { router } = require("./routes/routes");
// const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { socketio } = require('./controllers/play.controller');
const { sessionMiddleware } = require('./utils/method/method');


// view engine ejs
app.set('view engine', 'ejs');
// file static
app.use(express.static('public'));
// layouting
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// session cookie
app.use(cookieParser());
app.use(sessionMiddleware)
// flash message
app.use(flash());
// // override method PATCH, PUT, DELETE
app.use(methodOverride('_method'))

socketio(server);

app.use("/", main);

// API JSON
// app.get('/users', (req, res) => {
//   const data = loadUsers();
//   res.json(data);
// })

// start server
server.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Connection database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});