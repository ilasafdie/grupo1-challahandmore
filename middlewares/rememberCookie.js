/*  recordameMiddleware = (req, res, next) => {
  if (req.cookies.remember == undefined) {
    next();
  } else {
    req.session.username = req.cookies.remember;
    next();
  }
};

module.exports = recordameMiddleware;
 */