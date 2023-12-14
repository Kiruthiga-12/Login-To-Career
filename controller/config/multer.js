const dirname = process.cwd();
const path = require('path');
const multer = require('multer');
//multer options:
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, path.join(dirname + '/view/public/uploads'));
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname + '-' + Date.now());
        }
    }
)
const upload = multer(
    {
        storage: storage,
        limits:
        {
            fileSize: 1024 * 1024 * 2
        },
        fileFilter: (req, file, cb) => {
            if (path.extname(file.originalname) == ".doc" || path.extname(file.originalname) == ".docx") {
                cb(null, true);
            }
            else {
                console.log("File type should be a .doc or .docx file!!");
                cb(null, false);
            }
        }
    }
)

module.exports = upload;