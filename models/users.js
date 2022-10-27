const fs = require ('fs');
const users = {
    fileName: "./data/usersList.json",
    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function (){
        return this.getData();
    },
    create: function(userData){

    }
}

console.log( users.findAll());