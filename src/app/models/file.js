const db = require("../../config/db")
const fs = require("fs")


module.exports = {


        create({filename, path}) {

        const query = `

        INSERT INTO files (
                name,
                path    
        ) VALUES ($1, $2)
        RETURNING id

        `

        const values = [

        filename,
        path

        ]

        return db.query(query, values)

},

async delete(id) {

try {


const result = await db.query(`SELECT * FROM files WHERE id= $1`, [id])
const file = result.rows[0]

fs.unlinkSync(file.path)
return db.query(`

DELETE FROM files WHERE id = $1

        `, [id])


} catch (err) {
        console.error(err)
}



},

getFiles(id) {

return db.query(`

select files.*, recipe_files.recipe_id as recipe
from files
left join recipe_files on (recipe_files.file_id = files.id)
where recipe_files.recipe_id = $1

`, [id]) 


},
getChefFile(id) {

return db.query(`
SELECT files.*, chefs.id as chefs_id
FROM files
LEFT JOIN chefs on (chefs.file_id = files.id)
where chefs.id = $1
`, [id])

},
getAllfiles() {
        return db.query(`
        SELECT * FROM FILES
        `)
            
},
getFileById(id){

return db.query(`
SELECT * FROM files WHERE files.id = $1 
`, [id])

}



}