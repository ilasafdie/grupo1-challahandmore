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
        const productNew = req.body;
        console.log(req.body);
        productNew.id = products[products.length - 1].id + 1;
        products.push(productNew);
        const productJSON = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        res.redirect("/productCreate")
    },

    getProductList: function (req, res) {  /*lista productos segun categoria o el total de la lista*/
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

        const idRuta = req.params.id;

        const productReq = products[id - 1];

        res.render("productDetail", { productReq })

    },

    getEdit: function (req, res) {

        let idProduct = req.params.idProduct;

        let productToEdit = products[idProduct - 1]

        res.render("productEdit", { productToEdit: productToEdit });
    },

    getCreate: function (req, res) {
        res.render("productCreate");
    },

    putEdit: function (req, res) {

        const productEdited = req.body;
        let productsEdited = [];
console.log(req.body)
        for (let i=0 ; i < products.length; i++) {
            if (products[i].id === productEdited.id){
                productsEdited.push (productEdited)
            } else {
                productsEdited.push (products[i])
            }
        }
        
        const productJSON = JSON.stringify(productsEdited);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        res.render("productEdit")

    },


    /*METODOS DE USERS*/

    getUsers: function (req, res) {
        res.render("users")
    }
}




module.exports = controller;