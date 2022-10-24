const fs = require('fs');
const path = require('path');

const prodController = {

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

        let idProduct = req.params.idProduct;
      
        let productToEdit = products[idProduct - 1];

        res.render("productEdit", { productToEdit: productToEdit });
    },

    postEdit: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        console.log("fui por post");

        console.log(req.body);

      /*   const productEdited = req.body;
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
 */
    }
}

module.exports = prodController;