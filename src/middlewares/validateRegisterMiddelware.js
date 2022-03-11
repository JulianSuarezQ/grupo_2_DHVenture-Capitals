const path = require("path")
const { body } = require('express-validator');

module.exports = [
    body('name')
        .notEmpty().withMessage('El campo no puede estar vacio')
        .isLength({min: 2}).withMessage('Debe completar el nombre con al menos 2 caracteres'),
    body('last_name')
        .notEmpty().withMessage('El campo no puede estar vacio')
        .isLength({min: 2}).withMessage('Debe completar el apellido con al menos 2 caracteres'),

    body('email')
        .notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isEmail().withMessage('El campo debe contener un email')
        .custom((value,{req}) => {
            emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (emailRegex.test(value)){
                return true
            }else{
                throw new Error('no es un mail valido')
            }
        }),
        
    body('emailConfirm').custom((value,{req}) => {
        console.log("validacion back", value, req.body.email)
        if (value === req.body.email){
            return true
        }else{
            throw new Error('Los campos del email no son iguales')
        }
    }),
    
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

    body('dni')
        .notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isLength({min: 6, max:8}).withMessage('Debe tener entre 6 y 8 caracteres')
        .isNumeric().withMessage('El campo no es valido'),

    body('tel')
        .notEmpty().withMessage('El campo no puede estar vacio').bail()
        .isLength({min: 8, max:11}).withMessage('Debe tener entre 8 y 11 caracteres sin el 15 y con la caracteristica de la zona')
        .isNumeric().withMessage('El campo no es valido'),

    body('img').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    }),
    body('Polices')
        .isString("on").withMessage('Debes aceptar los Terminos y Condiciones'),

]