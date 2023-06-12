exports.wrongUrl = (req, res, next) => {
  res.status(404).render('errors/404', {
    layout: 'layouts/main-layout',
    title: 'Challange Chapter 8'
  });
};