const express = require("express")

const routes = express.Router()

const recipes = require("./controllers/recipes")



routes.get("/", recipes.home)
routes.get("/sobre", recipes.about )
routes.get("/receitas", recipes.pagerecipes )
routes.get("/receita/:id", recipes.recipe)



//route admin

routes.get("/admin/create", recipes.create)


routes.post("/admin", recipes.post )

module.exports = routes