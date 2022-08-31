const express = require ("express");
const path = require ("path");

const app = express();
app.use(express.static("public"))

app.listen(3000,()=> {
    console.log("servidor escuchando puerto 3000")
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,  "./views/home.html"))
});
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
})
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
})

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));
})

app.get('/detailsproducts', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/detailsproducts.html'));
})

