const fs = require('fs');
const path = require('path');


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

    getCarrito: function (req, res) {
        res.render("carrito")
    },


    /* METODOS DE PRODUCTOS */
    postCrear: function (req, res) { /*Crear productos nuevos*/
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        const productNew = req.body;
        productNew.id = products[productNew.length - 1].id + 1;
        products.push(productNew);
        const productJSON = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");
        res.redirect("/producto-crear")
    },

    getProductList: function (req, res) {  /*lista productos segun categoria o el total de la lista*/
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        res.render("productList", { 'products': products })
    },
    
    getVentana: function (req, res) {
        res.render("ventana-editar")
    },

    getAdmin: function (req, res) {
        res.render("administracion")
    },
     
    getDetalle: function (req, res) {

        const idRuta = req.params.id;
        const id = idRuta.slice(1,2)

        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        const productReq = products[id-1];
        
        res.render("detalle", { productReq })
        
    },

    getEditar: function (req, res) {
        res.render("editar-productos")
    },

    getEliminar: function (req, res) {
        res.render("eliminar-producto")
    },
    

    /*METODOS DE USERS*/

    getUsers: function (req, res) {
        res.render("users")
    }
}




module.exports = controller;