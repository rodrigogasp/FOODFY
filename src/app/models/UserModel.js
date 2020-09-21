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
            data.isadmin || false
        ]
    
        const results = await db.query(query, values)
    
        return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    
            
    
    },
    async showAll() {
        let results = await db.query('SELECT * FROM users')

        return results.rows

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
    },
    async findbyToken(token) {
        try {
            let results = await db.query('SELECT * FROM users WHERE reset_token=($1)', [token])

            return results.rows[0]

        } catch(err) {
            console.error(err)
        }
    },
    async update(id, data) {
        try{

            const query = `
        
            UPDATE users SET
            name=($1),
            email=($2)
            WHERE id = $3
        
        `

        const values = [
            data.name,
            data.email,
            id
        ]

        return db.query(query, values)


        } catch(err) {
            console.error(err)
        }

    },
    async updatedByAdmin(data) {

        try{

            const query = `
        
            UPDATE users SET
            name=($1),
            email=($2),
            is_admin=($3)
            WHERE id = $4
        
        `

        const values = [
            data.name,
            data.email,
            data.isadmin || false,
            data.id
        ]

        return db.query(query, values)


        } catch(err) {
            console.error(err)
        }

    },
    async updatePassword(id, password) {
        try{

            const query = `
        
            UPDATE users SET
            password=($1)
            WHERE id = $2
        
        `

        const passwordHash = await hash(password, 8)

        const values = [
            passwordHash,
            id
        ]

        return db.query(query, values)


        } catch(err) {
            console.error(err)
        }

    },
    async updateToken(id, token, tokenExpires) {
        try{

            const query = `
        
            UPDATE users SET
            reset_token=($1),
            reset_token_expires=($2)
            WHERE id = $3
        
        `
        const values = [
            token,
            tokenExpires,
            id
        ]

        return db.query(query, values)


        } catch(err) {
            console.error(err)
        }

    },
    async delete(id) {
        return db.query('DELETE from USERS WHERE id=$1', [id])
    }
}