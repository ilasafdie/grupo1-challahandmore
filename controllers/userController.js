const usersController = {
    //@GET/user/register
    getRegister: function (req, res) {
        res.render("register")
    },

    getUsers: function (req, res) {
        res.render("users")
    },

    registerUser: function(req, res){
        console.log("Nos enviaron el formulario")
    }
}

module.exports = usersController;