//module.exports = function(app, passport) {
let express = require('express')
let app = express()

//let Router = express.Router()

app = express.Router()


app.get('/', (request, response) => {

    let Message = require('../models/message')
    Message.all(function (messages) {

        response.render('pages/index', { messages : messages})

    })    
})


app.post('/', (request, response) => {
    if(request.body.message === undefined || request.body.message === ""){
        request.flash('error', "Vous na pas remplire les champs")
        response.redirect('/')
       
    } else {

        let Message = require('../models/message')
        Message.create(request.body.message, function() {
            request.flash('success', "Merci !")
            response.redirect('/')
        })

    }
       
})



app.get('/message/:id', (request, response) => {

    let Message = require('../models/message')
    Message.find(request.params.id, function(message) {

        response.render('messages/show', { message: message })

    })
})

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

module.exports = app


