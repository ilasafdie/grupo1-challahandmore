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


const fs = require('fs');
const path = require('path');
const multer = require('multer');
const user = require ('../models/users');


let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/usersList.json'), 'utf-8');
let users = JSON.parse(archivoJSON);
let usersJSON = JSON.stringify(users);

/*Donde vamos a querer almacenar las fotos de los usuarios nuevos*/

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

    postCreate: function (req, res) { /*Crear productos nuevos*/
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
        res.render("productCreate", { 'mensaje': mensaje }) */
        res.render('userCreate');
    },

    getUserList: function (req, res) {  /*lista productos segun categoria o el total de la lista*/

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



module.exports = usersController;