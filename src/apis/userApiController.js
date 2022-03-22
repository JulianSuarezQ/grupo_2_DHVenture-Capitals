const db = require("../../database/models");
const path = require("path");
const { dirname } = require("path");

/**
 *
 * @swagger
 * components:
 *    schemas:
 *      user:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: User Id
 *          name:
 *            type: string
 *            description: User Name
 *          detail:
 *            type: string
 *            description: Detail User
 *          email:
 *            type: string
 *            description: email User
 *      errorUser:
 *        type: object
 *        properties:
 *          error:
 *             type: string
 *             description: El ID no existe en nuestra base de datos
 *      userData:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *            description: User Id
 *          rol:
 *            type: string
 *            description: rol Name
 *          name:
 *            type: string
 *            description: User name
 *          last name:
 *            type: string
 *            description: User name
 *          email:
 *            type: string
 *            description: last User
 *          pass:
 *            type: string
 *            description: pass User
 *          birthday:
 *            type: string
 *            description: birthday User
 *          dni:
 *            type: string
 *            description: dni User
 *          gender:
 *            type: string
 *            description: gender User
 *          tel:
 *            type: string
 *            description: tel User
 *          polices:
 *            type: string
 *            description: polices User
 *          img:
 *            type: string
 *            description: img User
 *      errorDataUser:
 *        type: object
 *        properties:
 *          error:
 *             type: string
 *             description: El ID no existe en nuestra base de datos
 */

const usersApiController = {
  /**
   *
   * @swagger
   * /api/email/{email}:
   *  get:
   *      summary: get user by email
   *      tags: [Users]
   *      parameters:
   *      - in: path
   *        name: email
   *        schema:
   *          type: string
   *          required: true
   *      responses:
   *        200:
   *          description: Get user by email
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                $ref: '#/components/schemas/userData'
   *        404:
   *          description: Not found in db
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                $ref: '#/components/schemas/error'
   *
   */
  userEmail: (req, res) => {
    db.Users.findOne({
      where: {
        email: req.params.email,
      },
    })
      .then((user) => {
        return res.status(200).json({
          data: user,
          status: 200,
        });
      })
      .catch((error) => {
        error =
          "El email " +
          req.params.email +
          " no existe en nuestra base de datos";
        return res.status(404).json({
          error,
        });
      });
  },

  /**
   *
   * @swagger
   * /api/users:
   *  get:
   *      summary: get all users
   *      tags: [Users]
   *      responses:
   *        200:
   *          description: Get all users
   *          content:
   *            application/json:
   *               schema:
   *                type: array
   *                items:
   *                $ref: '#/components/schemas/user'
   *        404:
   *          description: Not found users in db
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                $ref: '#/components/schemas/errorDataUser'
   *
   */
  count: (req, res) => {
    db.Users.findAll(req.params.id)
      .then((users) => {
        return res.status(200).json({
          total: users.length,
          users: users.map((user) => {
            return {
              id: user.id_user,
              name: user.name,
              email: user.email,
              detail: "http://localhost:3000/api/users/" + user.id_user,
            };
          }),
          status: 200,
        });
      })
      .catch((error) => {
        error = "No existen usuarios en nuestra base de datos";
        return res.status(404).json({
          error,
        });
      });
  },

  /**
   *
   * @swagger
   * /api/users/{id}:
   *  get:
   *      summary: get user by id
   *      tags: [Users]
   *      parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *      responses:
   *        200:
   *          description: Get user by id
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                $ref: '#/components/schemas/user'
   *        404:
   *          description: Not found in db
   *          content:
   *            application/json:
   *               schema:
   *                type: object
   *                $ref: '#/components/schemas/error'
   *
   */
  users: (req, res) => {
    db.Users.findByPk(req.params.id)
      .then((user) => {
        return res.status(200).json({
          id: user.id_user,
          name: user.name,
          last_name: user.last_name,
          email: user.email,
          birth_date: user.birth_date,
          gender: user.gender,
          tel: user.tel,
          polices: user.polices,
          img: "http://localhost:3000/images/users/" + user.img,
          status: 200,
        });
      })
      .catch((error) => {
        error =
          "El usuario con ID " +
          req.params.id +
          " no existe en nuestra base de datos";
        return res.status(404).json({
          error,
        });
      });
  },
};

module.exports = usersApiController;
