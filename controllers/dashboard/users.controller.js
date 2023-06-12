const { User } = require('../../models');

exports.index = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })
  const users = await User.findAll({ order: ['id'] });
  res.render(`dashboard/users`, {
    layout: 'layouts/dashboard-layout',
    title: 'Admin',
    scs: req.flash('scs'),
    users,
    user
  });
};


exports.show = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })
  const id = req.params.id;
  const history = await User.findOne({ where: { id } });
  res.render(`dashboard/user`, {
    layout: 'layouts/dashboard-layout',
    title: 'Admin',
    id,
    scs: req.flash('scs'),
    history,
    user
  });
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const newData = {
    email: req.body.email,
  }
  const updateData = await User.update(newData, { where: { id } })
  req.flash('scs', 'Data Berhasil Di Ubah');
  res.status(200).redirect('/users')
  return updateData;
};

// exports.deletedata = async (req, res) => {
//   const id = req.params.id;
//   const hapus = await User.destroy({ where: { id } })
//   req.flash('scs', 'History Berhasil di HAPUS');
//   res.status(200).redirect('/users')
//   return hapus;
// };
