const fs = require ('fs');
const users = {
    fileName: "./data/usersList.json",
    getData: function(){
        return fs.readFileSync(this.fileName, 'utf-8');
    },
    create: function(userData){

    }
}

console.log( users.getData());