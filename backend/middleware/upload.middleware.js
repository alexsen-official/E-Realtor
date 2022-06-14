const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve(__dirname, '../uploads')),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (mimetype && extname)
        return cb(null, true);
    else
        cb(new Error('Only images are allowed!'));
}

module.exports = multer({ storage, fileFilter });
