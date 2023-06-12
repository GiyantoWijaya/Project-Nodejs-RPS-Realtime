const { User } = require('../../models');

exports.dashboard = async (req, res) => {
  const id = req.session.userId;
  const user = await User.findOne({ where: { id } })
  res.status(202).render(`dashboard/dashboard`, {
    layout: 'layouts/dashboard-layout',
    title: 'Challange Chapter 8',
    user
  });
};