module.exports = {
    async list(req, res) {
        return res.render('admin/users/list')
    },
    async create(req, res) {
        return res.render('admin/users/create')
    },
    async post(req, res) {

    }
}