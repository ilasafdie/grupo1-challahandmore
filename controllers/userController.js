const path = require("path");
const express = require ('express');
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs"); 
const { send } = require("process");

let controller = {
  login: (req, res) => {
    res.render("login", {
      title: "Login",
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processLogin: (req, res) => {
    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("login", {
        title: "Login",
        errors: validacionesResultado.mapped(),
        oldData: req.body,
        personaLogueada: req.session.usuarioLogueado,
      });
    } else {
      let usuariosObjeto = JSON.parse(
        fs.readFileSync(path.join(__dirname, "./data/usersList.json"))
      );
    
      let usuarioLogueado = usuariosObjeto.find(
        (usuarioActual) => usuarioActual.email == req.body.email
      );

      if (usuarioLogueado) {
        let verificarPassword = bcryptjs.compareSync(
          req.body.password,
          usuarioLogueado.password
        );

        if (verificarPassword) {
          delete usuarioLogueado.password && delete usuarioLogueado.passwordConfirm;
          req.session.usuarioLogueado = usuarioLogueado;

          if (req.body.remember != undefined) {
            res.cookie("remember me", req.session.usuarioLogueado, {
              maxAge: 6000 * 30,
            });
          }
          res.render("profile", {
            title: "Hola " + usuarioLogueado.username,
            user: usuarioLogueado,
            personaLogueada: req.session.usuarioLogueado,
          });
        } else {
          res.render("login", {
            title: "Login",
            errors: {
              password: {
                msg: "La contraseña es incorrecta",
              },
            },
            oldData: req.body,
            personaLogueada: req.session.usuarioLogueado,
          });
        }
      } else {
        res.render("login", {
          title: "Login",
          errors: {
            email: {
              msg: "El E-mail ingresado no esta registrado",
            },
          },
          personaLogueada: req.session.usuarioLogueado,
        });
      }
    }
  },

  profileView: (req, res) => {
    res.render("profile", {
      title: "Perfil",
      personaLogueada: req.session.usuarioLogueado,
      user: req.session.usuarioLogueado,
    });
  },

  register: (req, res) => {
    res.render("register", {
      title: "Registro",
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processRegister: (req, res) => {
    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("register", {
        title: "Registro",
        errors: validacionesResultado.mapped(),
        oldData: req.body,
        personaLogueada: req.session.usuarioLogueado,
      });
    } else {
      let usuariosObjeto = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../data/usersList.json"))
      );
      let corroborarUsuario = usuariosObjeto.find(
        (usuarioActual) => usuarioActual.email == req.body.email
      );

      if (!corroborarUsuario) {
        let nuevoUsuario = {
          id: usuariosObjeto.length + 1,
          username: req.body.username,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
          avatars: "./images/avatars/" + req.file.filename,
        };

        if (
          bcryptjs.compareSync(req.body.password, newUser.passwordConfirm)
        ) {
          usuariosObjeto.push(newUser);

          let usuariosObjetoJSON = JSON.stringify(usuariosObjeto, null, " ");

          fs.writeFileSync(
            path.join(__dirname, "../data/usersList.json"),
            usuariosObjetoJSON
          );

          res.redirect("login");
        } else {
          res.render("register", {
            title: "Register",
            errors: {
              passwordConfirm: {
                msg: "La contraseña ingresada no coincide",
              },
            },
            oldData: req.body,
            personaLogueada: req.session.usuarioLogueado,
          });
        }
      } else {
        res.render("register", {
          title: "Register",
          errors: {
            email: {
              msg: "Este E-mail ya se encuentra registrado",
            },
          },
          oldData: req.body,
          personaLogueada: req.session.usuarioLogueado,
        });
      }
    }
  },

  userEdit: (req, res) => {
    const idUser = Number(req.params.id);
    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./data/usersList.json"))
    );

    let usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == idUser
    );

    res.render("userEdit", {
      title: "Edit Profile",
      user: usuarioEditar,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processUserEdit: (req, res) => {
    const idUser = Number(req.params.id);
    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./data/usersList.json"))
    );
    let usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != idUser
    );
    let usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == idUser
    );

    let usuarioEditado = {
      id: usuarioEditar.id,
      username: req.body.username,
      email: req.body.email,
      password: usuarioEditar.password,
      passwordConfirm: usuarioEditar.passwordConfirm,
      avatars: usuarioEditar.avatars,
    };

    usuariosRestantes.push(usuarioEditado);

    let usuariosObjetoJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(
      path.join(__dirname, "./data/usersList.json"),
      usuariosObjetoJSON
    );

    res.render("profile", {
      title: "Hola " + usuarioEditado.nombre,
      user: usuarioEditado,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  editPassword: (req, res) => {
    const userId = Number(req.params.id);

    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./data/usersList.json"))
    );
    const usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == userId
    );

    res.render("editPassword", {
      title: "Editar Contraseña",
      user: usuarioEditar,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processEditPassword: (req, res) => {
    const userId = Number(req.params.id);

    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./data/usersList.json"))
    );
    const usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != userId
    );
    const usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == userId
    );

    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("editPassword", {
        title: "Edit Password",
        errors: validacionesResultado.mapped(),
        user: usuarioEditar,
        personaLogueada: req.session.usuarioLogueado,
      });
    } else {
      const verificacionPasswordActual = bcryptjs.compareSync(
        req.body.passwordOld,
        usuarioEditar.password
      );

      if (!verificacionPasswordActual) {
        res.render("editPassword", {
          title: "Edit Password",
          errors: {
            passwordOld: {
              msg: "Your password is wrong",
            },
          },
          user: usuarioEditar,
          personaLogueada: req.session.usuarioLogueado,
        });
      } else {
        const verificacionNewPassword = bcryptjs.compareSync(
          req.body.password,
          usuarioEditar.password
        );

        if (verificacionNewPassword) {
          res.render("editPassword", {
            title: "Edit Password",
            errors: {
              password: {
                msg: "Your new password does'nt have to match the previous",
              },
            },
            user: usuarioEditar,
            personaLogueada: req.session.usuarioLogueado,
          });
        } else {
          if (req.body.password == req.body.passwordConfirm) {
            const usuarioEditado = {
              id: usuarioEditar.id,
              username: usuarioEditar.username,
              email: usuarioEditar.email,
              password: bcryptjs.hashSync(req.body.password, 10),
              passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
              avatars: usuarioEditar.avatars,
            };

            usuariosRestantes.push(usuarioEditado);

            let usuariosObjetoJSON = JSON.stringify(
              usuariosRestantes,
              null,
              " "
            );

            fs.writeFileSync(
              path.join(__dirname, "./data/usersList.json"),
              usuariosObjetoJSON
            );

            res.redirect("/logout");
          } else {
            res.render("editPassword", {
              title: "Edit Password",
              errors: {
                passwordConfirm: {
                  msg: "the current password doesnt match",
                },
              },
              user: usuarioEditar,
              personaLogueada: req.session.usuarioLogueado,
            });
          }
        }
      }
    }
  },

  userDelete: (req, res) => {
    const userId = Number(req.params.id);

    const usuariosObjeto = JSON.parse(
      fs.readFileSync(path.join(__dirname, "./data/usersList.json"))
    );
    const usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != userId
    );

    const usuariosObjetoJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(
      path.join(__dirname, "./data/usersList.json"),
      usuariosObjetoJSON
    );

    res.redirect("/");
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("remember me");
    res.redirect("/login");
  },
};

module.exports = controller;