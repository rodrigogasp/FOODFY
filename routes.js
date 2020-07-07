const express = require("express")

const routes = express.Router()

const recipes = require("./controllers/recipes")



routes.get("/", recipes.home)
routes.get("/sobre", recipes.about )
routes.get("/receitas", recipes.pagerecipes )
routes.get("/receita/:id", recipes.recipe)



//route admin

routes.get("/admin/create", recipes.create)
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/:id", recipes.show)
routes.get("/admin/recipes/:id/edit", recipes.edit)


routes.post("/admin", recipes.post )
routes.put ("/admin", recipes.put)
routes.delete("/admin", recipes.delete)

module.exports = routes