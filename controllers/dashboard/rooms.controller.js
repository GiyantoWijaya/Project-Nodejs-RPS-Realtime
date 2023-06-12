const { User, Play } = require('../../models');

exports.index = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })
  const plays = await Play.findAll({ order: ['id'] });
  res.render(`dashboard/rooms`, {
    layout: 'layouts/dashboard-layout',
    title: 'Admin',
    scs: req.flash('scs'),
    plays,
    user
  });
};


exports.show = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })
  const id = req.params.id;
  const history = await Play.findOne({ where: { id } });
  res.render(`dashboard/room`, {
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
    roomName: req.body.roomName,
    roomNumber: req.body.roomNumber
  }
  const updateData = await Play.update(newData, { where: { id } })
  req.flash('scs', 'Data Berhasil Di Ubah');
  res.status(200).redirect('/rooms')
  return updateData;
};

// exports.deletedata = async (req, res) => {
//   const id = req.params.id;
//   const hapus = await Play.destroy({ where: { id } })
//   req.flash('scs', 'History Berhasil di HAPUS');
//   res.status(200).redirect('/users')
//   return hapus;
// };
