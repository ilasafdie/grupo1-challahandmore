/* const usersController = {
    //@GET/user/register
    getRegister: function (req, res) {
        res.render("register")
    },

    getUsers: function (req, res) {
        res.render("users")
    },

   registerUser: function(req, res){
        console.log("Nos enviaron el formulario")
    }
} */

/* 
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const user = require ('../models/users');


let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
let users = JSON.parse(archivoJSON);
let usersJSON = JSON.stringify(users);

/*Donde vamos a querer almacenar las fotos de los usuarios nuevos

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../public/images/<%type%>");
    },
    filename: function (req, file, cb) {
        cb(null, "${Date.now()}_img_${path.extname(file.originalname)}");
    }
})

const uploadFile = multer({ storage });

const usersController = {

    postCreate: function (req, res) { /*Crear productos nuevos
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/userList.json'), 'utf-8');
        let users = JSON.parse(archivoJSON);
        let userNewBody = req.body;
        let userNewId = users[users.length - 1].id + 1;
        let userNew = { "id": userNewId, ...userNewBody };
        console.log(req.body)
        console.log(userNew)

        user.push(userNew);

        let usersJSON = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, "../data/userList.json"), usersJSON, "utf-8");

        /* //MENSAJE DE CONFIRMACION, FALTA IMPLEMENTAR EN LA VISTA
        let mensaje = "Producto creado satisfactoriamente"
        res.render("productCreate", { 'mensaje': mensaje }) 
        res.render('userCreate');
    },

    getUserList: function (req, res) {  /*lista productos segun categoria o el total de la lista

        let searchParams = req.params.search;
        if (searchParams == undefined) {
            res.render("productList", { 'users': users, 'typeList': "all" })
        }
        else {
            let params = searchParams
            users = users.filter(user => user.type == params);
            res.render("usertList", { 'users': users, 'typeList': params })
        }
    },
    //////////////////////////////////////////

    getDetail: function (req, res) {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
        let users = JSON.parse(archivoJSON);
        const idRuta = req.params.id;

        const usersReq = users[idRuta - 1];
        console.log(usersReq)
        res.render("usersDetail", { usersReq })

    },

    getCreate: function (req, res) {
        res.render("usersCreate");
    },

    getEdit: function (req, res) {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
        let users = JSON.parse(archivoJSON);
        let idUsers = req.params.idUsers;

        let usersToEdit = users[idUsers - 1];

        res.render("userEdit", { usersToEdit: usersToEdit });
    },

    postEdit: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
        let users = JSON.parse(archivoJSON);

        const usersEdited = req.body;
        let userOld
        for (let user of products) {
            if (user.id == usersEdited.id) {
                userOld = user
            }
        }
        if (userEdited.photo == "") {
            userEdited.photo = userOld.photo
        }

        userEdited.id = userOld.id;

        let userEdited = [];
        for (let i = 0; i < user.length; i++) {

            if (users[i].id == userEdited.id) {
                userEdited.push(userEdited)
            } else {
                usersEdited.push(users[i])
            }
        }

        let usersJSON = JSON.stringify(usersEdited);
        fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");
        let userToEdit = productEdited
        res.render("userEdit", { userToEdit: userToEdit });
    },

    postDelete: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
        let users = JSON.parse(archivoJSON);
        console.log("viaje por post")
        console.log(req)

        let idUsers = req.body.idUsers;

        console.log(idUsers)
        let userEdited = [];
        for (let i = 0; i < users.length; i++) {

            if (users[i].id != idUsers) {
                userEdited.push(users[i])
            }
        }
        let usersJSON = JSON.stringify(userEdited);
        fs.writeFileSync(path.join(__dirname, "../data/usersList.json"), usersJSON, "utf-8");
        res.redirect("/userList");

    }
}



module.exports = usersController; */


const path = require("path");
const express = require ('express');
const fs = require("fs");
const { validationResult } = require("express-validator");
/* const bcryptjs = require("bcryptjs"); */
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
        fs.readFileSync(path.join(__dirname, "../data/userList.json"))
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
            title: "Hola " + usuarioLogueado.nombre,
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
              msg: "El email ingresado no esta registrado",
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
        fs.readFileSync(path.join(__dirname, "../data/userList.json"))
      );
      let corroborarUsuario = usuariosObjeto.find(
        (usuarioActual) => usuarioActual.email == req.body.email
      );

      if (!corroborarUsuario) {
        let nuevoUsuario = {
          id: usuariosObjeto.length + 1,
          Username: req.body.Username,
          Email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
          avatares: "./images/avatares/" + req.file.filename,
        };

        if (
          bcryptjs.compareSync(req.body.password, newUser.passwordConfirm)
        ) {
          usuariosObjeto.push(newUser);

          let usuariosObjetoJSON = JSON.stringify(usuariosObjeto, null, " ");

          fs.writeFileSync(
            path.join(__dirname, "../data/userList.json"),
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
              msg: "Este mail ya se encuentra registrado",
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
      fs.readFileSync(path.join(__dirname, "../data/userList.json"))
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
      fs.readFileSync(path.join(__dirname, "../data/userList.json"))
    );
    let usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != idUser
    );
    let usuarioEditar = usuariosObjeto.find(
      (usuarioActual) => usuarioActual.id == idUser
    );

    let usuarioEditado = {
      id: usuarioEditar.id,
      Username: req.body.nombre,
      email: req.body.email,
      password: usuarioEditar.password,
      passwordConfirm: usuarioEditar.passwordConfirm,
      avatares: avataresPerfil,
    };

    usuariosRestantes.push(usuarioEditado);

    let usuariosObjetoJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(
      path.join(__dirname, "../data/userList.json"),
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
      fs.readFileSync(path.join(__dirname, "../data/userList.json"))
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
      fs.readFileSync(path.join(__dirname, "../data/userList.json"))
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
              Username: usuarioEditar.nombre,
              email: usuarioEditar.email,
              password: bcryptjs.hashSync(req.body.password, 10),
              passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
              avatares: usuarioEditar.avataresPerfil,
            };

            usuariosRestantes.push(usuarioEditado);

            let usuariosObjetoJSON = JSON.stringify(
              usuariosRestantes,
              null,
              " "
            );

            fs.writeFileSync(
              path.join(__dirname, "../data/userList.json"),
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
      fs.readFileSync(path.join(__dirname, "../data/userList.json"))
    );
    const usuariosRestantes = usuariosObjeto.filter(
      (usuarioActual) => usuarioActual.id != userId
    );

    const usuariosObjetoJSON = JSON.stringify(usuariosRestantes, null, " ");

    fs.writeFileSync(
      path.join(__dirname, "../data/userList.json"),
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
