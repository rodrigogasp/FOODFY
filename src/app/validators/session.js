const User = require('../models/UserModel')

const {compare} = require("bcryptjs")


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

        return res.redirect('profile')
        }

        next()
    }
}