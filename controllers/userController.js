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


let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/userList.json'), 'utf-8');
let users = JSON.parse(archivoJSON);
let userJSON = JSON.stringify(users);

const prodController = {

    postCreate: function (req, res) { /*Crear productos nuevos*/
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/userList.json'), 'utf-8');
        let users = JSON.parse(archivoJSON);
        let userNewBody = req.body;
        let userNewId = users[users.length - 1].id + 1;
        let userNew = { "id": userNewId, ...userNewBody };
        console.log (req.body)
        console.log (userNew)
        
        user.push(userNew);

        let userJSON = JSON.stringify(users);
        fs.writeFileSync(path.join(__dirname, "../data/userList.json"), userJSON, "utf-8");

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
            users = users.filter(product => user.type == params);
            res.render("usertList", { 'users': users, 'typeList': params })
        }
    },
//////////////////////////////////////////

    getDetail: function (req, res) {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        const idRuta = req.params.id;

        const productReq = products[idRuta - 1];
        console.log(productReq)
        res.render("productDetail", { productReq })

    },

    getCreate: function (req, res) {
        res.render("productCreate");
    },

    getEdit: function (req, res) {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        let idProduct = req.params.idProduct;

        let productToEdit = products[idProduct - 1];

        res.render("productEdit", { productToEdit: productToEdit });
    },

    postEdit: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        const productEdited = req.body;
        let productOld
        for (let product of products) {
            if (product.id == productEdited.id) {
                productOld = product
            }
        }
        if (productEdited.photo == "") {
            productEdited.photo = productOld.photo
        }

        productEdited.id = productOld.id;

        let productsEdited = [];
        for (let i = 0; i < products.length; i++) {

            if (products[i].id == productEdited.id) {
                productsEdited.push(productEdited)
            } else {
                productsEdited.push(products[i])
            }
        }

        let productJSON = JSON.stringify(productsEdited);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        let productToEdit = productEdited
        res.render("productEdit", { productToEdit: productToEdit });
    },

    postDelete: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        console.log ("viaje por post")
        console.log (req)

        let idProduct = req.body.idProduct;

        console.log (idProduct)
        let productsEdited = [];
        for (let i = 0; i < products.length; i++) {

            if (products[i].id != idProduct) {
                productsEdited.push(products[i])
            }
        }
        let productJSON = JSON.stringify(productsEdited);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        res.redirect("/productList");
        
    }
}

/*Donde vamos a querer almacenar las fotos de los productos nuevos*/
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "../public/images/<%type%>");
    },
    filename: function(req, file, cb){
        cb(null, "${Date.now()}_img_${path.extname(file.originalname)}");
    }
})

const uploadFile = multer ({storage});





module.exports = prodController;

module.exports = usersController;