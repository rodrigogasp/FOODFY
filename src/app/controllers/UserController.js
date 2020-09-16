const User = require('../models/UserModel')

module.exports = {
    async list(req, res) {

        const users = await User.showAll()

        return res.render('admin/users/list', {users})
    },
    async create(req, res) {
       
        return res.render('admin/users/create')
    },
    async post(req, res) {

        let results = await User.create(req.body)

        return res.redirect('users')

    }
}