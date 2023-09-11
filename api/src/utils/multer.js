const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Define la carpeta donde se guardarán los archivos temporales
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Genera un nombre de archivo único
  }
});

const upload = multer({ storage: storage });


module.exports = upload;