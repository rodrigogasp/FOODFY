const User = require('../models/UserModel')
const {compare} = require('bcryptjs')

module.exports = {
    async post(req, res, next) {

        const body = req.body

        const keys = Object.keys(body)

        for (key of keys) {
            if (body[key] == "") {
                return res.render('admin/users/create', {
                   error: "Por favor preencha todos os campos",
                   user: body
                })
            }
        }

        const emailExists = await User.findByEmail(body.email)

        if(emailExists) return res.render('admin/users/create', {
            error: "Já existe uma conta vinculada a este e-mail",
            user: body
        })



        next()

    },
    async put(req, res, next) {
        const body = req.body

        const {password} = req.body

        const keys = Object.keys(body)

        for (key of keys) {
            if (body[key] == "") {
                return res.render('admin/profile/index', {
                   error: "Por favor preencha todos os campos",
                   user: body
                })
            }
        }

        const user = await User.findById(req.session.userId)

        const passed = await compare(password, user.password)


        if(!passed) return res.render('admin/profile/index', {
            error: 'Senha incorreta',
            user: body
        })

        next()
    },
    async updateAdmin(req, res, next) {

        const body = req.body

        const keys = Object.keys(body)

        for (key of keys) {
            if (body[key] == "") {
                return res.render(`admin/users/edit`, {
                   error: "Por favor preencha todos os campos",
                   user: body
                })
            }
        }

        next()


    },
    async delete(req, res, next) {

        let user = await User.findById(req.body.id)

        if(user.id == req.session.userId) return res.render('admin/users/edit', {
            error: "Você não pode deletar a sua própria conta",
            user
        })

        if(user.is_admin == true) return res.render('admin/users/edit', {
            error: "Você não pode deletar um usuário que é administrador",
            user
        })

        next()
    }
} 