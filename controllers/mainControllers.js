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
        res.render ("productList")
    },

    getUsers: function(req, res){
            res.render ("users") },

    getEditar: function(req, res){
            res.render ("editar-productos") },

    getCrear: function(req, res){
            res.render ("producto-crear") },

    getVentana: function(req, res){
            res.render ("ventana-editar") }

    }
    
    


module.exports = controller;