const { authentication, createToken, findUser, success, error } = require('../../utils/method/method');
const { User } = require('../../models');

exports.index = (req, res) => {
  return success(res, 200, 'Login Form', {
    "title": "Please Input this value with method POST",
    "email": "Input Your Email",
    "password": "Input Your Password"
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {

    if (await authentication(email, password) == true) {
      const user = await findUser(email);
      const token = createToken(user.id);
      const maxAge = 3 * 24 * 60 * 60;
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      await User.update({ token: token }, {
        where: {
          email: user.email
        }
      });
      req.session.userId = user.id;
      return success(res, 200, 'Login success', {
        token
      });
    } else {
      return error(res, 400, 'Email atau password yang anda masukkan SALAH!', {});
    }

  } catch (err) {
    console.log(err)
    return error(res, 400, err.message, {});

  }
};
