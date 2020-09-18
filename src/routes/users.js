const express = require("express")
const routes = express.Router()

const UserController = require("../app/controllers/UserController")
const SessionController = require("../app/controllers/SessionController")
const ProfileController = require("../app/controllers/ProfileController")



const userValidator = require('../app/validators/user')
const SessionValidator = require('../app/validators/session')


//Rotas de perfil para logar

routes.get('/login', SessionController.loginPage)
routes.post('/login', SessionValidator.login, SessionController.login)
routes.post('/logout', SessionController.logout)


// Rotas de perfil de um usuário logado
routes.get('/profile', ProfileController.index) // Mostrar o formulário com dados do usuário logado
routes.put('/profile', userValidator.put, ProfileController.put)// Editar o usuário logado
routes.get('/password-change', ProfileController.passwordChange) 
routes.put('/password-change', userValidator.updatePassword, ProfileController.putPasswordChange) 


// Rotas que o administrador irá acessar para gerenciar usuários
routes.get('/users', SessionValidator.isLogged, SessionValidator.isAdmin, UserController.list) //Mostrar a lista de usuários cadastrados
routes.get('/users/create', SessionValidator.isLogged, SessionValidator.isAdmin, UserController.create) //Criar um usuário
routes.post('/users', userValidator.post, UserController.post) //Cadastrar um usuário
routes.get('/users/:id', SessionValidator.isLogged, SessionValidator.isAdmin, UserController.edit)
routes.put('/users', userValidator.updateAdmin, UserController.put) // Editar um usuário
routes.delete('/users', userValidator.delete, UserController.delete) // Deletar um usuário


module.exports = routes