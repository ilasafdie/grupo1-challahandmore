const fs = require('fs');
const path = require('path');

let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
let products = JSON.parse(archivoJSON);
let productJSON = JSON.stringify(products);

const prodController = {

    postCreate: function (req, res) { /*Crear productos nuevos*/
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        let prodNewBody = req.body;
        let prodNewId = products[products.length - 1].id + 1;
        let productNew = { "id": prodNewId, ...prodNewBody };

        products.push(productNew);

        let productJSON = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");

        //MENSAJE DE CONFIRMACION, FALTA IMPLEMENTAR EN LA VISTA
        let mensaje = "Producto creado satisfactoriamente"
        res.render("productCreate", { 'mensaje': mensaje })
        res.render('productCreate');
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

    getDelete: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        let idProduct = req.params.idProduct;

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

module.exports = prodController;