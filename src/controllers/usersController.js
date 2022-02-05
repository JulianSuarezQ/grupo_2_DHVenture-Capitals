const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const user = require("../models/Users");

const usersFilePath = path.join(__dirname, "../db/users.json");

const usersController = {
  //RENDER LOGIN

  login: (req, res) => {
    res.render("login");
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
      let userLog = req.body.email;
      let userlogPass = req.body.password;
      console.log(userLog);
      let usersJSON = leerArchivo();
      let users;
      if (usersJSON) {
        users = JSON.parse(usersJSON);
      }

      let usuario = users.filter((logUser) => logUser.email == userLog);
      let isOkPass;
      usuario.forEach((usuario) => {
        userName = usuario.name;
        isOkPass = bcryptjs.compareSync(userlogPass, usuario.password);
      });

      if (isOkPass) {
        //guardar usuario en session
        delete usuario.password; //borra la propiedad de password para no tener la info en el request por seguridad
        req.session.userLogged = userName;
        console.log(req.session.userLogged);
        res.redirect("/");
      } else {
        return res.render("login", {
          errorsLogin: {
            email: {
              msg: "Las credenciales son inválidas",
            },
          },
        });
      }
    } else {
      res.render("login", {
        errors: validation.mapped(),
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

    if (validation.errors.length > 0) {
      return res.render("register", {
        errors: validation.mapped(),
        oldData: req.body,
      });
    }

    let userInDB = user.repitEmail("email", req.body.email);

    if (userInDB) {
      return res.render("register", {
        errors: {
          email: {
            msg: "Este email ya está registrado",
          },
        },
        oldData: req.body,
      });
    }

    let UserNew = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
      passwordconfirm: undefined,
      tel: parseInt(req.body.tel, 10),
      doc: parseInt(req.body.doc, 10),
      img: req.file.filename,
    };

    let userCreated = user.create(UserNew);

    return res.redirect("/");
  },
};

function leerArchivo() {
  return fs.readFileSync(usersFilePath, "utf-8");
}

module.exports = usersController;
