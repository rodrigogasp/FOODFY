const crypto = require('crypto')
const User = require('../models/UserModel')
const mailer = require('../../lib/mailer')

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
    },
    forgot(req, res) {
        return res.render('admin/session/forgot-password')
    },
    async emailRecovery(req, res) {

        const user = req.user

        try {

            const token = crypto.randomBytes(20).toString('hex')

        let now = new Date()
        now = now.setHours(now.getHours() + 1)

        await User.updateToken(user.id, token, now)

        await mailer.sendMail({
            to: user.email,
            from: 'rodrigogaspp@gmail.com',
            subject: 'Recuperação de senha',
            html: `<h2> Perdeu a chave? </h2>
            <p> Não se preocupe, clique no link abaixo para recuperar sua senha </p>
            <p> <a href="http://localhost:3000/admin/password-reset?token=${token}" target="_blank" 
                
            </a>RECUPERAR SENHA </p>
            
            `
        })

        return res.render('admin/session/forgot-password', {
            success: "Verifique seu email para resetar sua senha!"
        })

        } catch(err) {
            console.error(err)
            return res.render('admin/session/forgot-password', {
                error: "Erro inesperado, tente novamente"
            })
        }

        
        
    },
    resetForm(req, res) {
        return res.render('admin/session/password-reset', {token: req.query.token})
    },
   async resetPassword(req, res) {

        const user = req.user

        const {password} = req.body

        await User.updatePassword(user.id, password)

        return res.render('admin/session/password-reset', {
            success: 'Sua senha foi alterada com sucesso. Vá para a página de login e acesse!'
        })
    }
}