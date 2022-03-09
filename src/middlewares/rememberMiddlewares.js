const db = require("../../database/models")

function rememberMiddlewares (req,res,next){
    next();

    if(req.cookies.remember != undefined && req.session.userLogged == undefined){
        db.Users.findOne({
            includes: [
              {association: "rols"},
              {association: "user_carts"}
            ],
            where: {
              email: req.cookies.remember
            }
          })
            .then(user => {
                        req.session.userLogged = user.dataValues;
                    }   
                )
        
    }

}
module.exports = rememberMiddlewares;