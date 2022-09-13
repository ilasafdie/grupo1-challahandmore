const express = require ("express");
const mainRoutes= require("./routes/mainRoutes");

const app = express();

app.use (mainRoutes)

app.use(express.static("public"))

app.listen(3000,()=> {
    console.log("servidor escuchando puerto 3000")
});


