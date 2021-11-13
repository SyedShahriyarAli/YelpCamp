const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {

        var folderName = 'YelpCamp/Users';
        if (req.headers.username)
            folderName = `YelpCamp/${req.headers.username}`;

        return {
            folder: folderName,
            resource_type: "raw",
            format: file.originalname.split(".").pop(),
            public_id: file.originalname
        };
    },
});

module.exports = {
    cloudinary,
    storage
}