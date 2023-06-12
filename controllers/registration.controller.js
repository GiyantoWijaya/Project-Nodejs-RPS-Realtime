const { User } = require('../models');
const { encrypt, findUser } = require('../utils/method/method');
const { check, body, validationResult } = require('express-validator');

exports.index = (req, res) => {
  res.status(200).render('registration', {
    layout: 'layouts/main-layout',
    title: 'Login',
  });
};

exports.validator = [
  check('email', 'Email Tidak Valid!!').normalizeEmail().isEmail(),
  body('email').custom(async (value) => {
    const duplicate = await findUser(value);
    if (duplicate) throw new Error('Email Sudah Terdaftar! Gunakan Email Lain');
    return true
  }),
  check('password', 'Password Terlalu Pendek').isLength({ min: 3 })
];

exports.create = async (req, res) => {
  const errors = validationResult(req);
  const data = {
    email: req.body.email,
    password: encrypt(req.body.password)
  }
  if (!errors.isEmpty()) {
    res.render('registration', {
      layout: 'layouts/main-layout',
      title: 'Login',
      errors: errors.array(),
    })
  } else {
    const user = await User.create(data)
    req.flash('scs', 'Registrasi anda berhasil, Silahkan Login!')
    res.status(200).redirect('/login')
    return user;
  }
};