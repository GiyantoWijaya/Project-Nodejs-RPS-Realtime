exports.index = (req, res) => {
  res.render("index", {
    layout: "layouts/main-layout",
    title: "Challange Chapter 8",
  });
};
