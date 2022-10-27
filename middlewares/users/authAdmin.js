module.exports = (req, res, next) => {
  let admin = req.session.usuarioLogueado;
  if (admin == undefined) {
    res.redirect("/login");
  } else if (req.session.usuarioLogueado.nombre != "admin") {
    res.redirect("/profile");
    next();
  } else {
    next();
  }
};
