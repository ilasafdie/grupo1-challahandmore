const fs = require('fs');
const path = require('path');

let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
let products = JSON.parse(archivoJSON);

const controller = {

    /*METODOS CENTRALES */

    getHome: function (req, res) {
        res.render("home")
    },

    getLogin: function (req, res) {
        res.render("login")
    },

    getRegister: function (req, res) {
        res.render("register")
    },

    getError: function (req, res) {
        res.render("error")
    },

    getShopping: function (req, res) {
        res.render("shopping")
    },


    /* METODOS DE PRODUCTOS */
    postCreate: function (req, res) { /*Crear productos nuevos*/
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        const productNew = req.body;
        console.log(req.body);
        productNew.id = products[products.length - 1].id + 1;
        products.push(productNew);
        const productJSON = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        res.redirect("/productCreate")
    },

    getProductList: function (req, res) {  /*lista productos segun categoria o el total de la lista*/
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        let searchParams = req.params.search;
        if (searchParams == undefined) {
            res.render("productList", { 'products': products, 'typeList': "all" })
        }
        else {
            let params = searchParams
            products = products.filter(product => product.type == params);
            res.render("productList", { 'products': products, 'typeList': params })
        }
    },


    getDetail: function (req, res) {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        const idRuta = req.params.id;

        const productReq = products[id - 1];

        res.render("productDetail", { productReq })

    },

    getCreate: function (req, res) {
        res.render("productCreate");
    },

    getEdit: function (req, res) {

        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        console.log("fui por get");

        let idProduct = req.params.idProduct;
        console.log(idProduct);
        console.log(products);
        let productToEdit = products[idProduct - 1];

        console.log(productToEdit);

        res.render("productEdit", { productToEdit: productToEdit });
    },

    postEdit: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        console.log("fui por post")

        const productEdited = req.body;
        let productsEdited = [];

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === productEdited.id) {
                productsEdited.push(productEdited)
            } else {
                productsEdited.push(products[i])
            }
        }

        const productJSON = JSON.stringify(productsEdited);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        res.render("productEdit");

    },


    /*METODOS DE USERS*/

    getUsers: function (req, res) {
        res.render("users")
    }
}




module.exports = controller;