const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const { cookie } = require("express/lib/response");
const fs = require("fs");
const path = require("path");

//const user = require("../models/Users");

const db = require("../../database/models")

const usersFilePath = path.join(__dirname, "../db/users.json");

function leerArchivo() {
  return fs.readFileSync(usersFilePath, "utf-8");
}

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
    res.redirect("/");
  },

  // PROCESO DE LOGIN

  processLogin: (req, res) => {

    let validation = validationResult(req);
    if (validation.errors.length <= 0) {

      db.Users.findOne({
        includes: [
          {association: "rols"},
          {association: "user_carts"}
        ],
        where: {
          email: req.body.email
        }
      })
        .then(user => {
          if(bcryptjs.compareSync(req.body.password, user.dataValues.password) == true){
            console.log(req.body.password, user.dataValues.password, bcryptjs.compareSync(req.body.password, user.dataValues.password));
            delete user.dataValues.password;
            req.session.userLogged = user.dataValues;
            if(req.body.loginRememberMe){
              res.cookie("user", user.email, { maxAge: 60000 })
            }
            console.log(req.session.userLogged);
            res.redirect("/")
          }
        })
        .catch(e =>{
            console.log(e)
            res.render("login", {
                errorsLogin: {
                  email: {
                    msg: "Las credenciales son inválidas",
                  },
                }
              }
            )
          }
        );
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

    if (validation.errors.length > 0) {
      return res.render("register", {
        errors: validation.mapped(),
        oldData: req.body,
      });
    }

    db.Users.findOne({
      includes: [
        {association: "rols"},
        {association: "user_carts"}
      ],
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if(user){
          res.render("register", {
            errors: {
              email: {
                msg: "Este email ya está registrado",
              },
            },
            oldData: req.body,
          });
        }else{
          console.log(bcryptjs.hashSync(req.body.password, 10))
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
            img: req.file.filename
          })
          .then(res.redirect("/"))
          .catch(e => {
            console.log(e)
            }
          )
        }
      })    
  },

  perfil: (req, res) => {
    res.render("users");
  }
};



module.exports = usersController;
