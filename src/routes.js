const express = require("express")

const routes = express.Router()

const recipes = require("./app/controllers/recipes")
const admin = require("./app/controllers/admins")




routes.get("/", recipes.home)
routes.get("/sobre", recipes.about )
routes.get("/receitas", recipes.pagerecipes )
routes.get("/receita/:id", recipes.recipe)



//route admin
routes.get("/admin", function(req,res){return res.redirect("/admin/recipes")})
routes.get("/admin/create", admin.create)
routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)


routes.post("/admin", admin.post )
routes.put ("/admin", admin.put)
routes.delete("/admin", admin.delete)

module.exports = routes