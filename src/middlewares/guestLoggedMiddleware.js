function guestLoggedMiddleware(req, res, next) {
  if (req.session.userLogged) {
    //implementar el /profile para mandar al ususario logueado a su perfil en caso de que quiera entrar al login o al register
    return res.redirect("/");
    //return res.redirect("/users/profile")
  }
  next();
}

module.exports = guestLoggedMiddleware;
