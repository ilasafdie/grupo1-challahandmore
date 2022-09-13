const controller = {
    getIndex: function(req, res){
        res.render("index")},
    
    getHome: function(req, res){
        res.render("home") },

    getLogin: function(req, res){
        res.render ("login") },

    getRegister: function (req, res){
        res.render ("register") },

    getCarrito: function(req, res){
        res.render ("carrito") },

    getDetailProduct: function(req, res){
        res.render ("DetailProduct") }

    }
    


module.express = controller;