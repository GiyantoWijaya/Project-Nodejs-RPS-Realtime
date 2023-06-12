const { User, UserGameBiodata } = require('../../models');
const { check, validationResult } = require('express-validator');


exports.index = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } })

  if (user.isAdmin == true) {
    const bioDatas = await UserGameBiodata.findAll({ order: ['userId'] });
    res.render(`dashboard/usergamebiodata`, {
      layout: 'layouts/dashboard-layout',
      title: 'Admin',
      scs: req.flash('scs'),
      err: req.flash('err'),
      bioDatas,
      user
    });
  } else {
    const bioDatas = await UserGameBiodata.findAll({ where: { userId: req.session.userId }, order: ['id'] });
    res.render(`dashboard/usergamebiodata`, {
      layout: 'layouts/dashboard-layout',
      title: 'User Member',
      scs: req.flash('scs'),
      err: req.flash('err'),
      bioDatas,
      user
    });
  }
};
exports.validator = [
  check('name', 'Nama Terlalu Pendek!!').isLength({ min: 3 }),
  check('age', 'Harus Angka!').isInt().isLength({ max: 2 }).withMessage('Terlalu Banyak Angka!'),
  check('address', 'Alamat Terlalu Pendek').isLength({ min: 5 }),
  check('about', 'Deskripsi Terlalu Pendek').isLength({ min: 5 }),
];

exports.create = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } });
  if (user.isAdmin == true) {

    const errors = validationResult(req);
    const data = {
      userId: req.body.userId,
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      about: req.body.about
    };

    if (!errors.isEmpty()) {
      const bioDatas = await UserGameBiodata.findAll({ order: ['userId'] });
      res.render(`dashboard/usergamebiodata`, {
        layout: 'layouts/dashboard-layout',
        title: 'Admin',
        errors: errors.array(),
        scs: req.flash('scs'),
        err: req.flash('err'),
        bioDatas,
        user
      })

    } else {
      const checkuser = await User.findOne({ where: { id: data.userId } });
      if (checkuser) {
        const addData = await UserGameBiodata.create(data)
        req.flash('scs', 'Data Berhasil Tersimpan, Silahkan Tambah Data Lain')
        res.status(200).redirect('/biodata')
        return addData;
      } else {
        const bioDatas = await UserGameBiodata.findAll({ order: ['userId'] });
        req.flash('err', 'Data User ID Tidak Di Temukan')
        res.render(`dashboard/usergamebiodata`, {
          layout: 'layouts/dashboard-layout',
          title: 'Admin',
          scs: req.flash('scs'),
          err: req.flash('err'),
          bioDatas,
          user
        });
      }
    }

  } else {

    const errors = validationResult(req);
    const data = {
      userId: req.session.userId,
      name: req.body.name,
      age: req.body.age,
      address: req.body.address,
      about: req.body.about
    };

    if (!errors.isEmpty()) {
      const bioDatas = await UserGameBiodata.findAll({ where: { userId: req.session.userId } });
      res.render(`dashboard/usergamebiodata`, {
        layout: 'layouts/dashboard-layout',
        title: 'User Member',
        errors: errors.array(),
        scs: req.flash('scs'),
        bioDatas,
        user
      })
    } else {
      const addData = await UserGameBiodata.create(data)
      req.flash('scs', 'Data Berhasil Tersimpan, Silahkan Tambah Data Lain')
      res.status(200).redirect('/biodata')
      return addData;
    }
  }

};

exports.show = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } });
  const id = req.params.id;
  const biodata = await UserGameBiodata.findOne({ where: { id } });
  res.render(`dashboard/biodata`, {
    layout: 'layouts/dashboard-layout',
    title: 'Challange Chapter 6',
    scs: req.flash('scs'),
    name: biodata.name,
    age: biodata.age,
    address: biodata.address,
    about: biodata.about,
    id,
    user
  })
};

exports.update = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findOne({ where: { id: userId } });
  const errors = validationResult(req);
  const id = req.params.id;
  const newData = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    about: req.body.about
  }
  console.log(newData);
  if (!errors.isEmpty()) {
    const biodata = await UserGameBiodata.findOne({ where: { id } });
    console.log(biodata)
    res.render(`dashboard/biodata`, {
      layout: 'layouts/dashboard-layout',
      title: 'Challange Chapter-7',
      errors: errors.array(),
      scs: req.flash('scs'),
      name: biodata.name,
      age: biodata.age,
      address: biodata.address,
      about: biodata.about,
      id,
      user
    })
  } else {
    const updateData = await UserGameBiodata.update(newData, { where: { id } })
    req.flash('scs', 'Data Berhasil Di Ubah');
    res.status(200).redirect('/biodata')
    return updateData;
  }
};

exports.deletedata = async (req, res) => {
  const id = req.params.id;
  const hapus = await UserGameBiodata.destroy({ where: { id } })
  req.flash('scs', 'Data Berhasil di HAPUS');
  res.status(200).redirect('/biodata')
  return hapus;
};

