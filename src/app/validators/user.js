module.exports = {
    post(req, res, next) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.render('admin/users/create', {
                   error: "Por favor preencha todos os campos"
                })
            }
        }

    }
} 