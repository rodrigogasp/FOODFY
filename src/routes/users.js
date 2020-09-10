const express = require("express")
const routes = express.Router()

const UserController = require("../app/controllers/UserController")
const SessionController = require("../app/controllers/SessionController")


const userValidator = require('../app/validators/user')

//Rotas de perfil para logar

routes.get('/login', SessionController.loginPage)
routes.post('/login', SessionController.login)
//routes.post('/login', SessionController.logout)


// Rotas de perfil de um usuário logado
//routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
//routes.put('/profile', ProfileController.put)// Editar o usuário logado

// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/users/create', UserController.create) //Criar um usuário
routes.post('/users', userValidator.post, UserController.post) //Cadastrar um usuário
//routes.put('/users', UserController.put) // Editar um usuário
//routes.delete('/users', UserController.delete) // Deletar um usuário


module.exports = routes