const fs = require("fs");
const path = require('path')

const fileName =  "../db/users.json";

const pathUsers = path.join(__dirname, fileName);

const users = {

    getData: function () {
		return JSON.parse(fs.readFileSync(pathUsers, 'utf-8'));
	},
     
    findAll: function () {
		return this.getData();
	},

	repitEmail: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	create: function (userData) {

		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(pathUsers, JSON.stringify(allUsers, null,  ' '));
		return newUser;
	},
}

module.exports = users