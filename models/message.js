let connection = require('../config/db')
let moment = require('../config/moment')

//Classe
class Message {

    //Constructeur
    constructor (row) {
        this.row = row
    }

    //Les getters
    get content() {
        return this.row.content
    }

    get created_at() {
        return moment(this.row.created_at)
    }

    get id () {
        return this.row.id
    }


    //Methode Ajoute
    static create (content, cb) {

        connection.query('INSERT INTO messages SET content =?, created_at=?', [content, new Date()], (err, result) => {

            if(err) throw err
            cb(result)

        })

    }

    //Methode Selectionner tout
    static all(cb) {

        connection.query('SELECT * FROM messages', (err, rows) => {

            if (err) throw err
            cb(rows.map((row) => new Message(row)))

        })

    }


    //Methode Chercher
    static find(id, cb) {

        connection.query('SELECT * FROM messages where id = ? LIMIT 1', [id], (err, rows) => {

            if (err) throw err
            cb(new Message(rows[0]))

        })

    }

}

//Exporter le class pour acceder a leur methode static
module.exports =Message