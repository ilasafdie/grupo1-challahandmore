const fs = require ('fs');
const users = {
    fileName: "./data/usersList.json",
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function (params){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser){ 
        return lastUser.id + 1;
    }
    return 1;
     },

    findAll: function (){
        return this.getData();
    },

    findByPK: function(id){
        let allUsers = this.findAll();
        let usersFound = allUsers.find ( oneUser => oneUser.id === id);
        return usersFound;
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let usersFound = allUsers.find ( oneUser => oneUser[field] === text);
        return usersFound;
    },

    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return true;

    }
}

console.log(users.create({Username:'Dana', Email: ' charnisdana@gmail.com' }));