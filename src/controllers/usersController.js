const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');

const user = require('../models/Users');

const usersController = {

    login: (req, res) =>{
        res.render("login")
    },

	processLogin: (req , res) =>{
		
		let validation = validationResult(req);
		if(validation.errors.length > 0){
			return res.render('login', {
				errors: validation.mapped(),
				oldData: req.body
			});
		}
		res.redirect('/');
	},

    register: (req, res) =>{
        res.render("register",{
			errors: undefined
		})
    },

    createUser: (req, res) => {

		let validation = validationResult(req);

		if(validation.errors.length > 0){
			return res.render('register', {
				errors: validation.mapped(),
				oldData: req.body
			});
		}

        let userInDB = user.repitEmail('email', req.body.email);
        
        if (userInDB) {
			return res.render('register', {
				errors: {
					email: {
						msg: 'Este email ya está registrado'
					}
				},
				oldData: req.body
			});
		}
        
		let UserNew = {
			...req.body,
			password: bcryptjs.hashSync(req.body.password, 10),
			passwordconfirm: undefined,
			tel: parseInt(req.body.tel, 10),
			doc: parseInt(req.body.doc, 10),
			img: req.file.filename
		}


        let userCreated = user.create(UserNew);

		return res.redirect('/');
    },

}

module.exports = usersController;