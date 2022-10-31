const path = require("path");
const express = require('express');
const fs = require("fs");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const { send } = require("process");

let controller = {

  register: (req, res) => {  
      res.render("register", { userLogged: req.session.userLogged })
  },

  processRegister: (req, res) => {
    const errors = validationResult(req);
    //si entro por post a registro significa que no esta logueado
    if (!errors.isEmpty()) {
      // hay errores los muestro en la vista

      res.render("register", {
        errors: errors.mapped(),
        oldData: req.body,
        userLogged: req.session.userLogged
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
          errors: { username: { msg: "This username is already in use" } },
          oldData: req.body,
          userLogged: req.session.userLogged
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
            errors: { email: { msg: "This email is already registered" } },
            oldData: req.body,
            userLogged: req.session.userLogged
          });
        }

        //si el email no esta en uso, sigo validando
        //chequeo si las password coinciden
        else {
          if (req.body.password != req.body.repassword) {
            res.render("register", {
              errors: { repassword: { msg: "The passwords does not match" } },
              oldData: req.body,
              userLogged: req.session.userLogged
            })
          } else {
            // si paso todas las validaciones, creo el usuario
            let lastID = users[users.length - 1].id +1
            let password = bcryptjs.hashSync(req.body.password, 10)
            let repassword = bcryptjs.hashSync(req.body.repassword, 10)
            let newUser = {
              id: lastID,
              username: req.body.username,
              password: password,
              repassword: repassword,
              email: req.body.email,
              type: "Customer",
              avatar: "/images/avatars/" + req.body.avatar,
            };
            users.push(newUser);
            let usersJSON = JSON.stringify(users, null, " ");
            fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");

            //por ultimo hago el login del usuario registrado

            //primero borro datos viejos si hubiera
            res.clearCookie("remember");

            //almaceno el usuario logueado en la variable session
            req.session.userLogged = newUser;

            // cookie para recordar al usuario
            if (req.body.remember != undefined) {
              res.cookie("remember", req.session.userLogged.username, {
                maxAge: 1000 /*milisegundos = 1 seg*/ * 60 /*1 min*/ * 60 /*1 hora*/ * 24  /*1 dia*/ * 365 * 2, // 2 anios de duracion
              });
            }

            console.log (req.session.userLogged)
            //voy al home...
            res.render("home", { userLogged: req.session.userLogged });
          }
        }
      }
    }
  },

  login: (req, res) => {
    res.render("login",
      { userLogged: req.session.userLogged });
  },

  processLogin: (req, res) => {
    // las validaciones de isEmpty? se hacen a nivel formulario (campos required)

    // voy a buscar el usuario en el JSON y ver si existe
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);

    let usuarioLogueado = users.find(
      (usuarioActual) => usuarioActual.username == req.body.username
    );

    // Si no encuentra al usuario da error
    if (!usuarioLogueado) {
      res.render("login", {
        errors: { username: { msg: "The username supplied is not recognized" } },
        oldData: req.body,
        userLogged: req.session.userLogged
      });

    } else {
      // si encuentra al usuario va a validar la password

      let verificarPassword = bcryptjs.compareSync(req.body.password, usuarioLogueado.password);

      // si la password no coincide, manda error a la vista
      if (!verificarPassword) {
        res.render("login", {
          errors: { password: { msg: "The password does not match with the password registered" } },
          oldData: req.body,
          userLogged: req.session.userLogged
        });
      } else {
        // si las contraseñas coinciden, va a "loguear" al usuario
       
        //primero borro datos viejos si hubiera
        res.clearCookie("remember");

        //almaceno el usuario logueado en la variable session
        req.session.userLogged = usuarioLogueado;

        // cookie para recordar al usuario
        if (req.body.remember != undefined) {
          res.cookie("remember", req.session.userLogged.username, {
            maxAge: 1000 /*milisegundos = 1 seg*/ * 60 /*1 min*/ * 60 /*1 hora*/ * 24  /*1 dia*/ * 365 * 2, // 2 anios de duracion
          });
        }

        

      }
      //voy al home...
      res.redirect("/");
    }
  },

  profileView: (req, res) => {
    res.render("profile", {
      userLogged: req.session.userLogged
    });
  },

  processUserEdit: (req, res) => {
    
    let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
    let users = JSON.parse(archivoJSON);

    //capturo el username del body
    let username = req.body.username

    //con ese dato recupero el objeto usuario completo antes de cambios
    let userToEdit = users.find(
      (usuarioActual) => usuarioActual.username == username
    );
      console.log(req.body)
    //veo si modifico el avatar
    let avatar  
    if (req.body.newAvatar){
        avatar = req.body.newAvatar
      } else {
        avatar = userToEdit.avatar
      }
    //reconstruyo el usuario completo con los cambios
    let userEdited = {
      id: userToEdit.id,
      username: req.body.username,
      email: req.body.email,
      password: userToEdit.password,
      repassword: userToEdit.repassword,
      type: "Customer",
      avatar: avatar
    };

    //agrego el usuario al listado
    let newUsers = []
    for (let i=0; i< users.legth; i++){
      if (users[i].username == userEdited.username) {
        newUsers.push (userEdited)
      } else {
        newUsers.push (users[i])
      }
    }

    let usersJSON = JSON.stringify(newUsers, null, " ");

    fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");;

    res.render("profile", {
      userLogged: req.session.userLogged,
    });
  },

  changePassword: (req, res) => {
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
    res.redirect("/");
  },
};

module.exports = controller;