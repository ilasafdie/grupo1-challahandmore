const fs = require('fs');
const path = require('path');

let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
let products = JSON.parse(archivoJSON);
const productJSON = JSON.stringify(products);

const prodController = {

    postCreate: function (req, res) { /*Crear productos nuevos*/

        const productNewBody = req.body;
        let prodNewId = products[products.length - 1].id + 1;
        let productNew = {"id": prodNewId, ...productNewBody};
        products.push(productNew);
        
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");

     /*    let mensajeExito = {
            mensajeExito:'Producto Creado Satisfactoriamente'
         } ;
        res.render("productCreate", { 'mensajeExito' : mensajeExito}) */

         /* res.render ('productCreate');  */
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

    getCreate: function (req, res) {
        res.render("productCreate");
    },

    getEdit: function (req, res) {

        let idProduct = req.params.idProduct;
      
        let productToEdit = products[idProduct - 1];

        res.render("productEdit", { productToEdit: productToEdit });
    },

    postEdit: (req, res) => {

      const productEdited = req.body;
        let productsEdited = [];

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === productEdited.id) {
                productsEdited.push(productEdited)
            } else {
                productsEdited.push(products[i])
            }
        }

        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        let productToEdit = productEdited
        res.render("productEdit", { productToEdit: productToEdit });
 
    }
}

module.exports = prodController;