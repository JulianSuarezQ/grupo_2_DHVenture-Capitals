const path = require("path")
const { body } = require('express-validator');


module.exports = [
    body('name')
        .notEmpty().withMessage('El campo no puede estar vacio')
        .isLength({min: 4}).withMessage('Debe completar el nombre de minimo 4 caracteres'),
    body('last_name').notEmpty().withMessage('Debe completar el apellido'),
    body('dni')
        .notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isLength({min: 6, max:8}).withMessage('Debe tener entre 6 y 8 caracteres')
        .isNumeric().withMessage('El campo no es valido'),
    body('tel')
        .notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isLength({min: 8, max:11}).withMessage('Debe tener entre 8 y 11 caracteres sin el 15 y con la caracteristica de la zona')
        .isNumeric().withMessage('El campo no es valido'),

    body('email')
        .notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isEmail().withMessage('El campo debe contener un email'),
        
/*     body('emailConfirm').custom((value,{req}) => {
        console.log(value)
        if (value === req.body.emailConfirm){
            return true
        }else{
            throw new Error('Los campos del email no son iguales')
        }
    }),*/
    
    body('password')
        .notEmpty().withMessage('El campo no puede estar vacio')
        .isLength({min: 8, max: 16}).withMessage('La contraseña tiene que tener un minimo de 8 caracteres y un maximo de 16'),

    body('passwordConfirm').custom((value,{req}) => {
        let password = req.body.password;
        let passwordConfirm = req.body.passwordConfirm;
        if (req.body.password === req.body.passwordConfirm){
            return true
        }else{
            throw new Error('Los campos de la contraseña no son iguales')
        }
    }),

    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
]