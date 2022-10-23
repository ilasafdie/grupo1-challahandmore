const express = require ("express");
const path = require ("path");
const app = express();

const methodOverride= require ("method-override");

const mainRoutes = require("./routes/mainRoutes");
const userRoutes= require ("./routes/userRoutes");


app.set( "view engine", "ejs");
app.set("views", [
    path.join(__dirname,  "./views/main"),
    path.join(__dirname,  "./views/users"),
])

app.use(methodOverride("_method"));

app.use (mainRoutes);
app.use (userRoutes);

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use((req,res,next)=> {
    res.status(404).render("not-found")
})



app.listen(3000,()=> {
    console.log("servidor escuchando puerto 3000")
});

