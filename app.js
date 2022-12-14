const express = require ("express");
const mainRoutes = require("./routes/mainRoutes");
const userRoutes= require ("./routes/userRoutes");
const path = require ("path");

const app = express();
app.set( "view engine", "ejs");
app.set("views", [
    
    path.join(__dirname,  "./views/main"),
    
    path.join(__dirname,  "./views/users")

])
app.use (mainRoutes);
app.use ("/user",userRoutes);

app.use(express.static("public"))

app.listen(3000,()=> {
    console.log("servidor escuchando puerto 3000")
});


