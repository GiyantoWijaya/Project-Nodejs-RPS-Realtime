const { User, UserGameHistory } = require('../../models');

exports.index = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })
  const histories = await UserGameHistory.findAll({ where: { userId: req.session.userId }, order: ['id'] });
  res.render(`dashboard/usergamehistory`, {
    layout: 'layouts/dashboard-layout',
    title: 'Challange Chapter 8',
    scs: req.flash('scs'),
    histories,
    user
  });
};

exports.create = async (req, res) => {
  const userId = req.session.userId;
  const player = `Player Memilih : ${req.body.dataPlayer}`;
  const computer = `Computer Memilih : ${req.body.dataComputer}`;
  const result = req.body.result;

  const tambahData = {
    userId,
    result,
    computer,
    player
  }

  const tambahHistory = await UserGameHistory.create(tambahData);
  return tambahHistory
}

exports.show = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })
  const id = req.params.id;
  const history = await UserGameHistory.findOne({ where: { id } });
  res.render(`dashboard/history`, {
    layout: 'layouts/dashboard-layout',
    title: 'Challange Chapter 8',
    id,
    history,
    user
  });
};

exports.deletedata = async (req, res) => {
  const id = req.params.id;
  const hapus = await UserGameHistory.destroy({ where: { id } })
  req.flash('scs', 'History Berhasil di HAPUS');
  res.status(200).redirect('/history')
  return hapus;
};
