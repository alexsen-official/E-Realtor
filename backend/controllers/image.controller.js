const { Property } = require('../models');
const path = require('path');
const fs = require('fs/promises');

class ImageRouter {
    async getImage(req, res) {
        try {
            const image = path.resolve(__dirname, `../uploads/${ req.params.id }/${ req.params.name }`)
            res.status(200).sendFile(image);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async uploadImages(req, res) {
        try {
            const foundProperty = await Property.findById(req.params.id);
            const imageDirectory = path.resolve(__dirname, `../uploads/${ foundProperty._id }`);
            
            await fs.access(imageDirectory)
                    .catch(async _ => await fs.mkdir(imageDirectory, { recursive: true }));
            
            for (const file of req.files) {
                await Property.findOneAndUpdate(
                    { _id: foundProperty._id },
                    { $push: { images: file.originalname } },
                    { new: true }
                );
                
                await fs.rename(file.path, path.join(imageDirectory, file.originalname));
            }
            
            res.status(200).json(foundProperty);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async deleteImages(req, res) {
        try {
            const foundProperty = await Property.findById(req.params.id);
            const imageDirectory = path.resolve(__dirname, `../uploads/${ foundProperty._id }`);
    
            await fs.rm(imageDirectory, { recursive: true, force: true });
            foundProperty.images = [];
            
            res.status(200).json(foundProperty);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = new ImageRouter();
