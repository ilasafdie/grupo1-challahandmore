const fs = require ('fs');
const path = require ('path');


const controller = {
    
    getHome: function(req, res){
        res.render("home") },

    getLogin: function(req, res){
        res.render ("login") },

    getRegister: function (req, res){
        res.render ("register") },

    getCarrito: function(req, res){
        res.render ("carrito") },

    getDetailProduct: function(req, res){
        res.render ("detailsProduct") }, /*listado de productos para clientes*/

    getProductList: function(req,res){  /*lista productos segun categoria o el total de la lista*/
        let archivoJSON = fs.readFileSync(path.join(__dirname,'../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        res.render("productList", {'products': products})
    },

    getUsers: function(req, res){
            res.render ("users") },

    getEditar: function(req, res){
            res.render ("editar-productos") },

    getCrear: function(req, res){
            res.render ("producto-crear") },

    getVentana: function(req, res){
            res.render ("ventana-editar") },
            
 getDetalle: function(req, res){
                res.render ("detalle") },
                
     
    getError: function(req, res){
            res.render ("error") },

    getAdmin: function(req, res){
                res.render ("administracion") },

    getEliminar: function(req, res){
                res.render ("eliminar-producto") }
    

    }
    
    


module.exports = controller;