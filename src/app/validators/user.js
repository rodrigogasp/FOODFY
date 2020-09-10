module.exports = {
    post(req, res, next) {

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

        next()

    }
} 