const User = require('../models/UserModel')
const Recipe = require('../models/admin')


const {compare} = require("bcryptjs")
const { forgot } = require('../controllers/SessionController')
const { reset } = require('browser-sync')


module.exports = {
    async login(req, res, next) {
        const {email, password} = req.body

        const user = await User.findByEmail(email)

        if(!user) return res.render('admin/session/login', {
            user: req.body,
            error: 'Usuário não cadastrado!'
        })

        const passed = await compare(password, user.password)

        if(!passed) return res.render('admin/session/login', {
            user: req.body,
            error: 'Senha incorreta'
        })

        req.user = user

        next()
    },
    isLogged(req, res, next) {
        if(!req.session.userId) return res.render('admin/session/login', {
            error: 'Você precisa estar logado para acessar esta página'
        })

        if(req.session.userId) {
            next()
        }
    },
    async isAdmin(req, res, next) {
        let user = await User.findById(req.session.userId)

        if(user.is_admin != true) {

        req.session.error = 'Você não tem permissão para acessar esta página'

        return res.redirect('back')
        }

        next()
    },
    async isAdminRecipe(req, res, next) {

        let user = await User.findById(req.session.userId)

        if(user.is_admin != true) {
            
            let results = await Recipe.find(req.params.id)
            
            const RecipeUserId = results.rows[0].user_id
            
            if(RecipeUserId != user.id) {
                req.session.error = 'Você não pode alterar receitas de outros usuários'
                return res.redirect('back')
            }
        }

        next()

        


    },
    async forgot(req, res, next) {
        const {email} = req.body

        try{
            let user = await User.findByEmail(email)
    
            if(!user) return res.render("admin/session/forgot-password", {
                user: req.body,
                error: "Email não cadastrado!"
            })
    
            req.user = user
    
            next()
    
        }catch(err) {
            console.error(err)
        }
    },
    async reset(req, res, next) {

        const {email, password, token, passwordRepeat} = req.body

        const user = await User.findByEmail(email)
      
        if(!user) return res.render("admin/session/password-reset", {
            user: req.body,
            token,
            error: "Usuário não cadastrado!"
        })
    
        if(password != passwordRepeat) return res.render('admin/session/password-reset', {
            user: req.body,
            token,
            error: 'As senhas não são iguais'
        })
    
        if(token != user.reset_token) return res.render('admin/session/password-reset', {
            user: req.body,
            token,
            error: 'Token inválido! Solicite uma nova recuperação de senha.'
        })
    
        let now = new Date()
        now = now.setHours(now.getHours())
        
        if(now > user.reset_token_expires) return res.render('admin/session/password-reset', {
            user: req.body,
            token,
            error: 'Token expirado! Por favor, solicite uma nova recuperação de senha'
        })
    
        req.user = user
        next()




    }
}