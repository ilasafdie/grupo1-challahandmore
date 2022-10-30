const fs = require('fs');
const path = require('path');


let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
let products = JSON.parse(archivoJSON);
let productJSON = JSON.stringify(products);

const prodController = {

    getProductList: function (req, res) {  /*lista productos segun categoria o el total de la lista*/

        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        let searchParams = req.params.search;
        if (searchParams == undefined) {
            res.render("productList", { 'products': products, 'typeList': "all", userLogged: req.session.userLogged })
        }
        else {
            let params = searchParams
            products = products.filter(product => product.type == params);
            res.render("productList", { 'products': products, 'typeList': params, userLogged: req.session.userLogged })
        }
    },

    getDetail: function (req, res) {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        const idRuta = req.params.id;
        let productReq;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id == idRuta) {
                productReq = products[i]
            }
        }
        res.render("productDetail", { productReq, userLogged: req.session.userLogged })
    },

    getCreate: function (req, res) {
        res.render("productCreate", { userLogged: req.session.userLogged });
    },

    postCreate: function (req, res) { /*Crear productos nuevos*/
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        let prodNewBody = req.body;

        //si el usuario no cargo foto evita que la pagina de error
        let photoName
        if (req.file == undefined) {
            photoName = photoNameAlt
        }
        else {
            photoName = req.file.originalname
        }

        let photoNamePath = "/images/photoProduct/" + photoName
        let prodNewId = products[products.length - 1].id + 1;
        let productNew = {
            "id": prodNewId,
            "product_name": prodNewBody.product_name,
            "price": prodNewBody.price,
            "type": prodNewBody.type,
            "photo": photoNamePath,
            "photo_name": prodNewBody.photo_name,
            "descrip": prodNewBody.descrip
        };

        products.push(productNew);

        let productJSON = JSON.stringify(products);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");


        /*  let mensaje = "Producto creado satisfactoriamente"
     /*     res.render("productList", { 'products': products, 'typeList': "all", 'mensaje': mensaje })
   */
        res.redirect("productDetail/" + productNew.id)
    },

    getEdit: function (req, res) {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);
        let idProduct = req.params.idProduct;

        let producToEdit
        for (let product of products) {
            if (product.id == idProduct) {
                producToEdit = product
            }
        }

        res.render("productEdit", { productToEdit: producToEdit, userLogged: req.session.userLogged });
    },

    postEdit: (req, res) => {

        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        //INFO QUE VIENE DEL FORM DE EDITAR EL PRODUCTO
        const productEdited = req.body;

        //CONSIGO EL PRODUCTO ORIGINAL PARA RECUPERAR EL RESTO DE LA INFO
        let productOld
        for (let product of products) {
            if (product.id == productEdited.id) {
                productOld = product
            }
        }

        //CHEQUEO SI HUBO CAMBIO DE FOTO Y COMPLETO LA INFO
        if (req.file == undefined) {
            productEdited.photo = productOld.photo
        }
        else {
            let photoNamePathEdit = "/images/photoProduct/" + req.file.originalname;
            productEdited.photo = photoNamePathEdit;
        }

        //EVITA CONFLICTO DE TIPO EN EL ID
        productEdited.id = productOld.id;

        //RECONSTRUYO EL OL
        let finalProductEdited = {
            "id": productEdited.id,
            "product_name": productEdited.product_name,
            "price": productEdited.price,
            "type": productEdited.type,
            "photo": productEdited.photo,
            "photo_name": productEdited.photo_name,
            "descrip": productEdited.descrip
        };

        //REEMPLAZO EL PRODUCTO EN EL ARRAY DE PRODUCTOS
        let productsEdited = [];
        for (let i = 0; i < products.length; i++) {

            if (products[i].id == productEdited.id) {
                productsEdited.push(finalProductEdited)
            } else {
                productsEdited.push(products[i])
            }
        }

        //PASO A JSON Y RENDERIZO LA LISTA DE PRODUCTOS 

        let productJSON = JSON.stringify(productsEdited);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");

        res.render("productList", { 'products': productsEdited, 'typeList':  "all", userLogged: req.session.userLogged })
    },

    postDelete: (req, res) => {
        let archivoJSON = fs.readFileSync(path.join(__dirname, '../data/productsList.json'), 'utf-8');
        let products = JSON.parse(archivoJSON);

        let idProduct = req.params.idProduct;

        let productsEdited = [];
        for (let i = 0; i < products.length; i++) {

            if (products[i].id != idProduct) {
                productsEdited.push(products[i])
            }
        }
        let productJSON = JSON.stringify(productsEdited);
        fs.writeFileSync(path.join(__dirname, "../data/productsList.json"), productJSON, "utf-8");

        res.render("productList", { 'products': productsEdited, 'typeList':  "all", userLogged: req.session.userLogged })

    },

}



module.exports = prodController;