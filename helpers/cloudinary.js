const cloudinary = require('cloudinary').v2
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

const cloudinaryUpload = (file) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file)
        .then((result) => {
            resolve(result.secure_url)
        })
        .catch((error) => {
            reject(error)
        })
    })
}

module.exports = {
    cloudinaryUpload
}