const upload = require('../utils/multer');
const { Upload } = require('@aws-sdk/lib-storage');
const stream = require('stream');
const s3 = require('../utils/s3');
const { DeleteObjectCommand } = require('@aws-sdk/client-s3');

const MAX_RETRIES = 3;

const deleteImage = async (image, retryCount = 0) => {
  const key = 'products/' + decodeURIComponent(image.split('/').pop());
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  try {
    console.log(`Intentando eliminar la imagen ${image}`);
    await s3.send(new DeleteObjectCommand(params));
  } catch (error) {
    console.error(`Error al eliminar la imagen ${image}: ${error.message}`);
    if (retryCount < MAX_RETRIES) {
      console.log(`Reintentando eliminar la imagen ${image}. Intento ${retryCount + 1}`);
      await new Promise(r => setTimeout(r, 2000));
      await deleteImage(image, retryCount + 1);
    } else {
      console.error(`No se pudo eliminar la imagen ${image} después de ${MAX_RETRIES} intentos`);
    }
  }
};

const deleteImages = async (images) => {
  const deletePromises = images.map(image => deleteImage(image));
  await Promise.all(deletePromises);
};

const uploadFiles = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, async (err) => {
      if (err) {
        return reject(err);
      }
      
      if (!req.files) {
        return reject(new Error('No file uploaded'));
      }

      const uploads = req.files.map((file) => {
        const passThrough = new stream.PassThrough();
        passThrough.end(file.buffer);

        return new Upload({
          client: s3,
          params: {
            Bucket: process.env.AWS_BUCKET_NAME,
            // Key: `/${Date.now().toString()}-${file.originalname}`,
            Key: `products/${Date.now().toString()}-${file.originalname}`,
            Body: passThrough,
            ContentType: file.mimetype,
            // ACL: 'public-read',
          },
        });
      });

      try {
        const results = await Promise.all(uploads.map((upload) => upload.done()));
        req.files = results.map((result, index) => ({
          ...req.files[index],
          location: result.Location,
        }));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
};


module.exports = {
  uploadFiles,
  deleteImages,
  deleteImage,
};