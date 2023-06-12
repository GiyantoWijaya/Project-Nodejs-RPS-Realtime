const session = require('express-session');
const bcrypt = require('bcrypt');
const fs = require('fs');
const saltRounds = 10;
const { sequelize, User, UserGameBiodata, UserGameHistory, Play, MultiPlayerGameHistory } = require('../../models');

const jwt = require('jsonwebtoken');
const { result } = require('lodash');

// async function addPlay() {
//   const user1 = await User.findOne({ where: { id: 1 } });
//   const user2 = await User.findOne({ where: { id: 2 } });
//   console.log(user1)
//   const play1 = await Play.create({
//     roomName: 'Room 1',
//     roomNumber: 1234,
//     userId1: user1.id,
//     userId2: user2.id,
//     player1: true,
//     player2: false
//   });
//   console.log('Plays created successfully:', play1.toJSON());
// }
// async function addPlay() {
//   const multiplayer = await MultiPlayerGameHistory.create({
//     playId: 1,
//     result: 'player 1 menang',
//     player1: 'batu',
//     player2: 'gunting'
//   });
// }
// addPlay()

// session
const sessionMiddleware = session({
  cookie: { maxAge: 6000 },
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
});

// Multiplayer Methods
function makeRoomId() {
  let result = Math.floor(1000 + Math.random() * 9000)
  return result
}

// load all data users
async function loadUsers() {
  const showAll = await User.findAll()
  return showAll
  // const fileBuffer = fs.readFileSync('users.json', 'utf-8');
  // const users = JSON.parse(fileBuffer);
  // return users;
}
// save data users
function saveData(users) {
  fs.writeFileSync('users.json', JSON.stringify(users));
}

// add data users
function addUser(user) {
  const users = loadUsers();
  users.push(user);
  saveData(users);
}

// findUsers
async function findUser(email) {
  const user = await User.findOne({ where: { email } });
  return user
}

// encrypt password
function encrypt(password) {
  const result = bcrypt.hashSync(password, saltRounds);
  return result
}


// authenticator
const maxAge = 3 * 24 * 60 * 60;
function createToken(id) {
  return jwt.sign({ id }, 'secret', { expiresIn: maxAge })
}

async function authentication(email, password) {
  const user = await findUser(email);
  if (user) {
    const hasil = await bcrypt.compare(password, user.password);
    return hasil
  } else {
    console.log('akun tidak di temukan')
  }
}

function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        req.session.userId = decodedToken.id
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

function guest(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    res.redirect("/404")
  }
  next()
}


// Multiplayer Method
function score(player1, player2) {
  if (player1 === "batu" && player2 === "batu" || player1 === "kertas" && player2 === "kertas" ||
    player1 === "gunting" && player2 === "gunting") {
    return 'Draw!!'
  } else if (player1 === "batu" && player2 === "kertas" || player1 === "kertas" && player2 === "gunting" || player1 === "gunting" && player2 === "batu") {
    return 'Player 2 Win'
  } else {
    return 'Player 1 Win'
  }
}

// MCR Response
function success(res, status = 200, message = "", data = {}) {
  res.status(status).json({
    message,
    data
  });
}

function error(res, status = 400, message = "", data = {}) {
  res.status(status).json({
    error: {
      message,
      data
    }
  });
}





module.exports = {
  loadUsers, findUser, addUser,
  // login and registration
  encrypt, authentication, auth, createToken, guest,
  // multiplayers
  makeRoomId, sessionMiddleware, score,
  // MCR Response
  success, error
}