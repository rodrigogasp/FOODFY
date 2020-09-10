module.exports = {
    loginPage(req, res) {
        return res.render('admin/session/login.njk')
    },
    login(req, res) {
        return res.redirect('users')
    }
}