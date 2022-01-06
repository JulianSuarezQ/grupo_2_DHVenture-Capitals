const bcryptjs = require('bcryptjs');

const user = require('../models/Users');

const usersController = {

    login: (req, res) =>{
        res.render("login")
    },

    register: (req, res) =>{
        res.render("register",{
			errors: undefined
		})
    },

    createUser: (req, res) => {

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
			img: req.file.filename
		}


        let userCreated = user.create(UserNew);

		return res.redirect('/');
    },

}

module.exports = usersController;