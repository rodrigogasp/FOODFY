module.exports = {
    loginPage(req, res) {
        return res.render('admin/session/login.njk')
    },
    login(req, res) {

        req.session.userId = req.user.id

        return res.redirect('profile')
    },
    logout(req, res) {
        req.session.destroy()

        return res.redirect('/')
    }
}