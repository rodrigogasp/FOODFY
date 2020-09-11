const User = require('../models/UserModel')

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

    }
} 