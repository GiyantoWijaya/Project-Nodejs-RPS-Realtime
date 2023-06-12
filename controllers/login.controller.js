const { authentication, createToken, findUser } = require('../utils/method/method');
const { User } = require('../models');

exports.index = (req, res) => {
  res.status(200).render('login', {
    layout: 'layouts/main-layout',
    title: 'Login',
    msg: req.flash('msg'),
    scs: req.flash('scs'),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
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
    res.status(200).redirect("/dashboard");
  } else {
    req.flash('msg', 'Email atau password yang anda masukkan SALAH!')
    res.redirect('/login')
  }
};

exports.logout = (req, res) => {
  req.session.destroy;
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
