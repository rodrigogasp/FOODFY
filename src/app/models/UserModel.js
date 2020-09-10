const crypto = require('crypto')
const db = require('../../config/db')

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
    
        const password = crypto.randomBytes(4).toString('hex')
    
        const values = [
            data.name,
            data.email,
            password,
            data.isadmin
        ]
    
        const results = await db.query(query, values)
    
        return results.rows[0].id
        } catch(err) {
            console.error(err)
        }
    
            
    
        },
}