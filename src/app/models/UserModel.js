const crypto = require('crypto')
const db = require('../../config/db')
const mailer = require('../../lib/mailer')
const {hash} = require('bcryptjs')

module.exports = {
    async create(data){

        try {
            const query = `
            INSERT INTO users (
                name,
                email,
                password,
                is_admin
            ) VALUES ($1, $2, $3, $4)
            RETURNING id
        `
        console.log(data.isadmin)
        
        const password = crypto.randomBytes(4).toString('hex')

        await mailer.sendMail({
            to: data.email,
            from: 'rodrigogaspp@gmail.com',
            subject: 'Sua conta foi criada!',
            html: `<h2> Bem vindo ao FoodFy! </h2>
            <p> Segue abaixo sua senha para fazer o login na parte administrativa do site! </p> 
            <p> Senha: ${password} </p>
            
            `
        })

        const passwordHash = await hash(password, 8)
    
        const values = [
            data.name,
            data.email,
            passwordHash,
            data.isadmin
        ]
    
        const results = await db.query(query, values)
    
        return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    
            
    
    },
    async findByEmail(email) {
        try {


            let results =  await db.query('SELECT * FROM users WHERE lower(email) = lower($1)', [email])


            return results.rows[0]

        } catch(err) {
            console.error(err)
        }
    },
    async findById(id) {
        try{

            let results = await db.query('SELECT * FROM users WHERE id = $1', [id])    

            return results.rows[0]

        } catch(err) {
            console.error(err)
        }
    }
}