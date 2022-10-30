const fs = require("fs");
const path = require("path");

let rememberMiddleware = (req, res, next) => {
  
  if (req.cookies.remember != undefined && req.session.userLogged == undefined) {
    //si la cookie existe pero el usuario no esta logueado, lo recupero desde la cookie
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);
    let userLogged = users.find(
      (usuarioActual) => usuarioActual.username == req.cookies.remember
    );
    req.session.userLogged = userLogged
    next ()
  }
  else {
    next();
  }

} 

module.exports = rememberMiddleware;
