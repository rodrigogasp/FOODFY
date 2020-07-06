const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const recipes = require("./data")

server.listen(5000, function(){
    console.log("server is running")
}) 


server.use(express.static("public"))

server.set("view engine", "njk")

server.get("/", function(req, res){
    return res.render("home")
})

server.get("/sobre", function(req, res){
    return res.render("about")
})

server.get("/receitas", function(req, res){
    return res.render("recipes")
})

server.get("/receita/:id", function(req, res) {
    const id = req.params.id
    const recipe = recipes.find(function(recipe) {

        if (recipe.id == id) {
            return true
        }
    })
    if (!recipe) {
        return res.send("Recipe not found!")
    }
    return res.render("recipe", { item: recipe });
})

nunjucks.configure("views", {
    express:server,
    autoescape: false
})
