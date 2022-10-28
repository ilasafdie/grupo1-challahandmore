const path = require("path");
const express = require('express');
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { send } = require("process");

let controller = {

  register: (req, res) => {
    res.render("register"/* , {
      personaLogueada: req.session.usuarioLogueado,
    } */);
    //si el usuario ya esta logueado deberia enviar a la vista de perfil y no al registro
  },

  processRegister: (req, res) => {

    const errors = validationResult(req);

    //si entro por post a registro significa que no esta logueado
    if (!errors.isEmpty()) {
      // hay errores los muestro en la vista

      res.render("register", {
        errors: errors.mapped(),
        oldData: req.body,
        /*       personaLogueada: req.session.usuarioLogueado, */
      });


    } else { //no hay errores sigamos adelante para procesar el registro
      let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
      let users = JSON.parse(archivoJSON);

      //veo si el usuario ya existe lo busco en el json
      let corroborarUsuario = users.find(
        (usuarioActual) => usuarioActual.username == req.body.username
      );

      // si lo encuentro ya existe, muestro el error
      if (corroborarUsuario) {
        res.render("register", {
          errors: {
            username: {
              msg: "This username is already in use",
            },
          },
          oldData: req.body
        /* personaLogueada: req.session.usuarioLogueado */,
        });
      }

      // si el user no existe continua

      // valida si ya existe el email
      else {
        let corroborarEmail = users.find(
          (usuarioActual) => usuarioActual.email == req.body.email
        );

        // si lo encuentro ya existe, muestro el error
        if (corroborarEmail) {
          res.render("register", {
            errors: {
              email: {
                msg: "This email is already registered",
              },
            },
            oldData: req.body
          /* personaLogueada: req.session.usuarioLogueado */,
          });
        }
        else {




          let newUser = {
            id: users.length + 1,
            username: req.body.username,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            repassword: bcryptjs.hashSync(req.body.repassword, 10),
            type: "Customer",
            avatars: "./images/avatars/" + req.body.avatar,

          };

          if (
            bcryptjs.compareSync(req.body.password, newUser.repassword)
          ) {
            users.push(newUser);

            let usersJSON = JSON.stringify(users, null, " ");

            fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");


            res.redirect("login");
          } else {
            res.render("register", {
              errors: {
                repassword: {
                  msg: "La contraseña ingresada no coincide",
                },
              },
              oldData: req.body,
              personaLogueada: req.session.usuarioLogueado,
            });
          }
        }
      }
    }
  },

  login: (req, res) => {
    res.render("login", {
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processLogin: (req, res) => {
    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("login", {
        errors: validacionesResultado.mapped(),
        oldData: req.body,
        personaLogueada: req.session.usuarioLogueado,
      });
    } else {
      let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
      let users = JSON.parse(archivoJSON);

      let usuarioLogueado = users.find(
        (usuarioActual) => usuarioActual.email == req.body.email
      );

      if (usuarioLogueado) {
        let verificarPassword = bcryptjs.compareSync(
          req.body.password,
          usuarioLogueado.password
        );

        if (verificarPassword) {
          delete usuarioLogueado.password && delete usuarioLogueado.repassword;
          req.session.usuarioLogueado = usuarioLogueado;

          if (req.body.remember != undefined) {
            res.cookie("remember me", req.session.usuarioLogueado, {
              maxAge: 6000 * 30,
            });
          }
          res.render("/", {
            /* title: "Hi " + usuarioLogueado.username, */
            user: usuarioLogueado,
            personaLogueada: req.session.usuarioLogueado,
          });

          //quise poner el mensaje en alguna vista pero me sale error
          //no lo logre
          /*   <h3 class="welcome height">
              <% if (req.session.usuarioLogueado) { %>
                  <%= title %> 
              <% } %> 
            </h3> 
            MALKA*/

        } else {
          res.render("login", {
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
      personaLogueada: req.session.usuarioLogueado,
      user: req.session.usuarioLogueado,
    });
  },

  userEdit: (req, res) => {
    const idUser = Number(req.params.id);
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);

    let userEdit = users.find(
      (usuarioActual) => usuarioActual.id == idUser
    );

    res.render("userEdit", {
      user: userEdit,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processUserEdit: (req, res) => {
    const idUser = Number(req.params.id);
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);

    let usuariosRestantes = users.filter(
      (usuarioActual) => usuarioActual.id != idUser
    );
    let usuarioEditar = users.find(
      (usuarioActual) => usuarioActual.id == idUser
    );

    let usuarioEditado = {
      id: usuarioEditar.id,
      username: req.body.username,
      email: req.body.email,
      password: usuarioEditar.password,
      repassword: usuarioEditar.repassword,
      avatars: usuarioEditar.avatars,
    };

    usuariosRestantes.push(usuarioEditado);

    let usersJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");;

    res.render("profile", {
      /*    title: "Hola " + usuarioEditado.nombre, */
      user: usuarioEditado,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  editPassword: (req, res) => {
    const userId = Number(req.params.id);

    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);


    const usuarioEditar = users.find(
      (usuarioActual) => usuarioActual.id == userId
    );

    res.render("editPassword", {
      user: usuarioEditar,
      personaLogueada: req.session.usuarioLogueado,
    });
  },

  processEditPassword: (req, res) => {
    const userId = Number(req.params.id);

    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);

    const usuariosRestantes = users.filter(
      (usuarioActual) => usuarioActual.id != userId
    );
    const usuarioEditar = users.find(
      (usuarioActual) => usuarioActual.id == userId
    );

    const validacionesResultado = validationResult(req);

    if (validacionesResultado.errors.length > 0) {
      res.render("editPassword", {
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
            errors: {
              password: {
                msg: "Your new password does'nt have to match the previous",
              },
            },
            user: usuarioEditar,
            personaLogueada: req.session.usuarioLogueado,
          });
        } else {
          if (req.body.password == req.body.repassword) {
            const usuarioEditado = {
              id: usuarioEditar.id,
              username: usuarioEditar.username,
              email: usuarioEditar.email,
              password: bcryptjs.hashSync(req.body.password, 10),
              repassword: bcryptjs.hashSync(req.body.repassword, 10),
              avatars: usuarioEditar.avatars,
            };

            usuariosRestantes.push(usuarioEditado);

            let usersJSON = JSON.stringify(
              usuariosRestantes,
              null,
              " "
            );

            fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");

            res.redirect("/logout");
          } else {
            res.render("editPassword", {
              errors: {
                repassword: {
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

    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);

    const usuariosRestantes = users.filter(
      (usuarioActual) => usuarioActual.id != userId
    );

    const usersJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");

    res.redirect("/");
  },

  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("remember");
    res.redirect("/login");
  },
};

module.exports = controller;