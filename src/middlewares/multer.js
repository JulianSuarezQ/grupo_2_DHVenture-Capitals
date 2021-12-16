const multer = require ('multer');
const path = require ('path')

const folderPath = multer({ dest: path.resolve(__dirname, '../../public/images/products') }) 


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folderPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  })
  
const upload = multer({ storage: storage })


module.exports = upload