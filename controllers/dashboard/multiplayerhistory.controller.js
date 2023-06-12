const { User, Play, MultiPlayerGameHistory } = require('../../models');

exports.index = async (req, res) => {
  const userId = req.session.userId;
  const room1 = await Play.findOne({ where: { userId1: req.session.userId } });
  const room2 = await Play.findOne({ where: { userId2: req.session.userId } });
  const user = await User.findOne({ where: { id: userId } });
  if (user.isAdmin == false) {
    if (room1) {
      const histories = await MultiPlayerGameHistory.findAll({ where: { playId: room1.id }, order: ['id'] });
      res.render(`dashboard/multiplayerHistory`, {
        layout: 'layouts/dashboard-layout',
        title: 'User Member',
        scs: req.flash('scs'),
        histories,
        user
      });
    } else if (room2) {
      const histories = await MultiPlayerGameHistory.findAll({ where: { playId: room2.id }, order: ['id'] });
      res.render(`dashboard/multiplayerHistory`, {
        layout: 'layouts/dashboard-layout',
        title: 'User Member',
        scs: req.flash('scs'),
        histories,
        user
      });
    } else {
      res.render(`dashboard/multiplayerHistory`, {
        layout: 'layouts/dashboard-layout',
        title: 'User Member',
        scs: req.flash('scs'),
        histories: undefined,
        user
      });
    }
  } else {
    const histories = await MultiPlayerGameHistory.findAll({ order: ['noHistory'] });
    res.render(`dashboard/multiplayerHistory`, {
      layout: 'layouts/dashboard-layout',
      title: 'Admin',
      scs: req.flash('scs'),
      histories,
      user
    });
  }
};

exports.show = async (req, res) => {
  const id = req.params.id;
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })
  const history = await MultiPlayerGameHistory.findOne({ where: { id } });
  res.render(`dashboard/mhistory`, {
    layout: 'layouts/dashboard-layout',
    title: 'User Member',
    scs: req.flash('scs'),
    id,
    history,
    user
  });
};

exports.create = async (req, res) => {
  const data = {
    playId: req.body.playId,
    noHistory: req.body.noHistory,
    result: req.body.result,
    player1: req.body.player1,
    player2: req.body.player2
  };

  const addData = await MultiPlayerGameHistory.create(data)
  req.flash('scs', 'Data Berhasil Tersimpan, Silahkan Tambah Data Lain')
  res.status(200).redirect('/multiplayerhistory')
  return addData;


};

exports.update = async (req, res) => {
  const id = req.params.id;
  const history = await MultiPlayerGameHistory.findOne({ where: { id } });
  const newData = {
    result: req.body.result,
    player1: req.body.player1,
    player2: req.body.player2
  }
  console.log(newData);
  const updateData = await MultiPlayerGameHistory.update(newData, { where: { id } })
  req.flash('scs', 'Data Berhasil Di Ubah');
  res.status(200).redirect('/multiplayerhistory')
  return updateData;
}


exports.deletedata = async (req, res) => {
  const id = req.params.id;
  const hapus = await MultiPlayerGameHistory.destroy({ where: { id } })
  req.flash('scs', 'History Berhasil di HAPUS');
  res.status(200).redirect('/multiplayerhistory')
  return hapus;
};
