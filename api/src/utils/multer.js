const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Agrega aquí cualquier filtro de archivo que necesites
    cb(null, true);
  },
// }).array('images');
}).any();


module.exports = upload;