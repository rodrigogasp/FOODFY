const User = require('../models/UserModel')

module.exports = {
    async index(req, res) {

        const user = await User.findById(req.session.userId)


        return res.render('admin/profile/index', {user})
    }
}