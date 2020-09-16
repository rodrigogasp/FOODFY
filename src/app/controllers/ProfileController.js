const User = require('../models/UserModel')

module.exports = {
    async index(req, res) {

        const user = await User.findById(req.session.userId)

        error = req.session.error

        return res.render('admin/profile/index', {user, error})
    },
    async put(req, res) {

        const id = req.session.userId

        await User.update(id, req.body)

        return res.render('admin/profile/index', {
            success: 'Alterações feitas com sucesso!',
            user: req.body
        })

    },
    
}