//Package neccesaire
let express = require('express')
let bodyParser = require('body-parser')
let session  = require('express-session')

let app = express()

//Moteur de template
app.set('view engine', 'ejs')

//Midelware
app.use('/assets', express.static('public'))
app.use(bodyParser.json())
app.use(session({
    secret: 'elhassen',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(require('./middelwares/flash'))

//Route
app.use(require('./app/routes'))

//Port
app.listen(3030)