module.exports = (req, res, next) => {
  if (req.cookies.recuerdame == undefined) {
    next();
  } else {
    req.session.usuarioLogueado = req.cookies.recuerdame;
    next();
  }
};
