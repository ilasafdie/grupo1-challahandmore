const express = require ("express");
const path = require ("path");
const app = express();

const methodOverride = require ("method-override");

const mainRoutes = require("./routes/mainRoutes");
const userRoutes= require ("./routes/userRoutes");
const prodRoutes = require ("./routes/prodRoutes")


app.set( "view engine", "ejs");
app.set("views", [
    path.join(__dirname,  "./views/main"),
    path.join(__dirname,  "./views/users"),
    path.join(__dirname,  "./views/partials"),
])

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use (mainRoutes);
app.use (userRoutes);
app.use (prodRoutes);

app.use(express.static("public"));




app.use((req,res,next)=> {
    res.status(404).render("not-found")
})



app.listen(3000,()=> {
    console.log("servidor escuchando puerto 3000")
});

