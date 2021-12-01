var cloudinary = require('cloudinary').v2;
// process.env.
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
});


export const uploadAvatar = async (picture) => {
    const image = await cloudinary.uploader.upload(picture, { upload_preset: "socizilla", width: 500, height: 500, crop: "scale" });
    return image.secure_url
}
export const uploadArt = async (picture) => {
    const image = await cloudinary.uploader.upload(picture, { upload_preset: "socizilla" });
    const tags = image.info.categorization.google_tagging.data.map(a => {
        return a.tag
    })
    return {
        image,
        tags
    }
}
export default cloudinary;