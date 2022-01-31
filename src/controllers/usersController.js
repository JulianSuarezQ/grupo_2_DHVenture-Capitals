const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");
const user = require('../models/Users');

const usersFilePath = path.join(__dirname, "../db/users.json");

const usersController = {

    login: (req, res) =>{
        res.render("login")
    },

	processLogin: (req , res) =>{

		let validation = validationResult(req);
		if(validation.errors.length > 0){
			let usuarioALoguearse = {};
			let usersJSON = fs.readFileSync(usersFilePath, "utf-8");
			let users;
			if (usersJSON == "") {
				users = [];
			} else {
				users = JSON.parse(usersJSON);
			}

			for (let i = 0; i < users.length; i++) {
				if (users[i].email == req.body.email) {
					if (bcryptjs.compareSync(req.body.password, users[i].password)) {
						let usuarioALoguearse = users[i];
						break;
					}
				}
			}

			if(usuarioALoguearse == undefined) {
				return res.render('login', {errors: [
					{msg: 'Credenciales invalidas'}
				]})
			}

			req.session.usuarioLogueado = usuarioALoguearse;

		} else {
			return res.render('login', {
				errors: validation.mapped(),
				oldData: req.body
			});
		}
		
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