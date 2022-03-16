const db = require("../../database/models")

const usersApiController = {

  userEmail: (req, res) => {
    db.Users.findOne({
      where: {
        email: req.params.email,
      }
    })
      .then(user => {
        return res.status(200).json({
          data: user,
          status: 200
        })
      })
  },

  count: (req, res) => {
    db.Users.findAll(req.params.id)
      .then(users => {
        return res.status(200).json({
            total: users.length,
            users: users.map(user => {
              return {
                id: user.id_user,
                name: user.name,
                email: user.email,
                detail: "hacer"
              }
            }),
            status: 200
        })
      })
  },

  users: (req, res) => {
    db.Users.findByPk(req.params.id)
      .then(user => {
        return res.status(200).json({
          id: user.id_user,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          birth_date: user.birth_date,
          gender: user.gender,
          tel: user.tel,
          polices: user.polices,
          img: user.dni,
          status: 200
        })
      })
  },

}

module.exports = usersApiController;
