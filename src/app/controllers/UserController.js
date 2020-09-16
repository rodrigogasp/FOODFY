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

    },
    async edit(req, res) {

        const userid = req.params.id

        let user = await User.findById(userid)

        return res.render('admin/users/edit', {user}) 
    },
    async put(req, res) {

        console.log(req.body)

        await User.updatedByAdmin(req.body)

        return res.redirect('users')
    },
    async delete(req, res) {

        await User.delete(req.body.id)

        return res.redirect('users')
    }
}