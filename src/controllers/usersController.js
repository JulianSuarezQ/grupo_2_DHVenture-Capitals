const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");
const { cookie } = require("express/lib/response");

const db = require("../../database/models");

const usersController = {
  //RENDER LOGIN

  login: (req, res) => {
    res.render("login", {
      errors: undefined,
    });
  },

  //RENDER LOGOUT
  logOut: (req, res) => {
    delete req.session.userLogged;
    delete res.cookie.user;
    res.redirect("/");
  },

  // PROCESO DE LOGIN

  processLogin: (req, res) => {
    let validation = validationResult(req);

    if (validation.errors.length <= 0) {
      db.Users.findOne({
        includes: [{ association: "rols" }, { association: "user_carts" }],
        where: {
          email: req.body.email,
        },
      })
        .then((user) => {
          if (
            bcryptjs.compareSync(req.body.password, user.dataValues.password) ==
            true
          ) {
            //console.log(req.body.password, user.dataValues.password, bcryptjs.compareSync(req.body.password, user.dataValues.password));
            delete user.dataValues.password;
            req.session.userLogged = user.dataValues;
            console.log(req.body);
            if (req.body.remember !== undefined) {
              res.cookie("remember", user.dataValues.email, { maxAge: 60000 });
            }
            console.log("remember ", req.body.remember);
            console.log("");
            res.redirect("/");
          }
        })
        .catch((e) => {
          console.log(e);
          res.render("login", {
            errorsLogin: {
              email: {
                msg: "Las credenciales son inválidas",
              },
            },
          });
        });
    }
  },

  //RENDER DE REGISTER

  register: (req, res) => {
    res.render("register", {
      errors: undefined,
    });
  },

  //CREAR USUARIO NUEVO

  createUser: (req, res) => {
    let validation = validationResult(req);
    //validacion del backend
    console.log(validation);

    db.Users.findOne({
      includes: [{ association: "rols" }, { association: "user_carts" }],
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (user) {
          //Validacion del mail registrado
          validation.errors.push({
            value: req.body.email,
            msg: "Este email ya está registrado",
            param: "email",
            location: "body",
          });
          console.log(validation);
        }
      })
      .then(function () {
        if (validation.errors.length == 0) {
          db.Users.create({
            id_rol: 2,
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            birth_date: req.body.birth_date,
            dni: req.body.dni,
            gender: req.body.gender,
            tel: parseInt(req.body.tel, 10),
            polices: true,
            img: req.file.filename,
          });
          res.redirect("/");
        } else {
          console.log(validation);
          res.render("register", {
            errors: validation.mapped(),
            oldData: req.body,
          });
        }
      })
      .catch((e) => console.log(e));
  },

  perfil: (req, res) => {
    res.render("users");
  },
};

module.exports = usersController;
