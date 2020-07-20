const db = require("../../config/db")



module.exports = {


all(callback) {

    db.query(
        `
        SELECT *
        FROM chefs
        ORDER BY chefs.name ASC
        
        
        `, function(err, results) {

            if(err) throw `Database Error! ${err}`

            callback(results.rows)

        }



    )




},
create(data, callback) {

    const keys = Object.keys(data)

    for(key of keys) {
        if (data[key]== "") {

            return res.send("Please, fill all fields!")
        }
    }


    const query = `
    
    INSERT into chefs (

        name,
        avatar_url

    ) VALUES ($1, $2)
    RETURNING id
    
    
    `

    const values = [

        data.name,
        data.image


    ]

    db.query(query, values, function(err, results){

        if (err) throw `Database error! ${err}`

        callback(results.rows[0])


    })



},
find(id, callback) {

db.query(
`
SELECT * 
FROM chefs
WHERE id = $1
`, [id], function(err, results) {

    if (err) throw `Database Error! ${err}`

    callback(results.rows[0])

}


)



}




}