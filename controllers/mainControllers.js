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
        res.render ("detailsProduct") },

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