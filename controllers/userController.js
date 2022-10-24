const usersController = {
    //@GET/user/register
    getRegister: function (req, res) {
        res.render("register")
    },

    getUsers: function (req, res) {
        res.render("users")
    }
}

module.exports = usersController;