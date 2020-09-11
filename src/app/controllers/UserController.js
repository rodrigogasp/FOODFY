const User = require('../models/UserModel')

module.exports = {
    async list(req, res) {
        return res.render('admin/users/list')
    },
    async create(req, res) {
       
        return res.render('admin/users/create')
    },
    async post(req, res) {

        let results = await User.create(req.body)

        return res.redirect('users')

    }
}