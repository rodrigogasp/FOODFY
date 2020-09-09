const express = require("express")
const multer = require('./app/middlewares/multer')
const routes = express.Router()

const generals = require("./app/controllers/generals")
const admin = require("./app/controllers/admins")
const chef = require("./app/controllers/chefs")
const UserController = require("./app/controllers/UserController")

const userValidator = require('./app/validators/user')




routes.get("/", generals.home)
routes.get("/sobre", generals.about )
routes.get("/receitas", generals.pagerecipes )
routes.get("/recipe/:id",generals.recipe)
routes.get("/chefs", generals.chef)



//route admin recipes
routes.get("/admin", function(req,res){return res.redirect("/admin/recipes")})
routes.get("/admin/recipes/create", admin.create)
routes.get("/admin/recipes", admin.index)
routes.get("/admin/recipes/:id", admin.show)
routes.get("/admin/recipes/:id/edit", admin.edit)
routes.post("/admin/recipes", multer.array("photos", 5), admin.post ) 
routes.put ("/admin/recipes", multer.array("photos", 5), admin.put)
routes.delete("/admin/recipes", admin.delete)


//route admin chef

routes.get("/admin/chefs", chef.index)
routes.get("/admin/chefs/create", chef.create)
routes.get("/admin/chefs/:id", chef.show)
routes.get("/admin/chefs/:id/edit", chef.edit)
routes.post("/admin/chefs", multer.array("photos", 1), chef.post)
routes.put("/admin/chefs", multer.array("photos", 1), chef.put)
routes.delete("/admin/chefs", chef.delete)


// Rotas de perfil de um usuário logado
//routes.get('/admin/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
//routes.put('/admin/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/admin/users', UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/admin/users/create', UserController.create) //Criar um usuário
routes.post('/admin/users', userValidator.post, UserController.post) //Cadastrar um usuário
//routes.put('/admin/users', UserController.put) // Editar um usuário
//routes.delete('/admin/users', UserController.delete) // Deletar um usuário

module.exports = routes    