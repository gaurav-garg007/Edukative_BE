const cloudinary = require('./cloudinary.config.js');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const uploadToCloudinary = async (path) => {
    try{
        const result = await cloudinary.uploader.upload(path, {
            folder: 'edukative',
            resource_type: 'image',
            allowed_formats: [ 'jpg', 'jpeg', 'png' ]
        });
        return result;
    }catch(error){
        console.error('Error uploading image:', error);
        throw error;
    }
}

module.exports = {
    uploadToCloudinary, upload
};