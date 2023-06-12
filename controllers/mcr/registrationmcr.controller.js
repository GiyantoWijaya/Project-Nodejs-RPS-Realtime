const { User } = require('../../models');
const { encrypt, findUser, success, error } = require('../../utils/method/method');
const { check, body, validationResult } = require('express-validator');

exports.index = (req, res) => {
  return success(res, 200, 'Registration Form', {
    "title": "Please Input this value with method POST",
    "email": "Input Your Email",
    "password": "Input Your Password"
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
  try {

    if (!errors.isEmpty()) {
      return error(res, 400, errors, {});
    } else {
      const user = await User.create(data);
      return success(res, 200, 'Registrasi anda berhasil, Silahkan Login!', { data });
    }

  } catch (err) {
    console.log(err)
    return error(res, 400, err.message, {});
  }
};