const multer = require('multer');


/*Donde vamos a querer almacenar las fotos de los productos nuevos*/
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/images/photoProduct");
    },
    filename: function(req, file, cb){
        cb(null,  file.originalname);
    }
})

const uploadFile = multer ({storage})
module.exports = uploadFile;