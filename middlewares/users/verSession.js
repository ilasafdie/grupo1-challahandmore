function verSession(req,res,next) {
    if(req.session.usuarioLogueado){
        res.render("profile", {
            title: "Hola " + req.session.usuarioLogueado.nombre,
            user: req.session.usuarioLogueado,
            personaLogueada: req.session.usuarioLogueado
          });
    }
    next();
}

module.exports = verSession;