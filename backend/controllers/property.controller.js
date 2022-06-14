const { Property, User } = require('../models');

class PropertyController {
    async getProperty(req, res) {
        try {
            const foundProperty = await Property
                .findById(req.params.id)
                .populate('owner');
            
            res.status(200).json(foundProperty);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async getAllProperties(req, res) {
        try {
            const allProperties = await Property.find().populate('owner');
            res.status(200).json(allProperties);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async createProperty(req, res) {
        try {
            const newProperty = new Property(req.body);
            const savedProperty = await newProperty.save();
            
            await User.findOneAndUpdate(
                { _id: savedProperty.owner },
                { $push: { properties: savedProperty._id } },
                { new: true }
            );
            
            res.status(200).json(newProperty);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }

    async updateProperty(req, res) {
        try {
            const updatedProperty = {
                _id: req.params.id,
                ...req.body
            };
        
            await Property.updateOne(
                { _id: updatedProperty._id },
                { $set: updatedProperty }
            );
        
            res.status(200).json(updatedProperty);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async deleteProperty(req, res) {
        try {
            const propertyToDelete = await Property.findById(req.params.id);
    
            await User.findOneAndUpdate(
                { _id: propertyToDelete.owner },
                { $pull: { properties: req.params.id } }
            );
    
            const deletedProperty = await propertyToDelete.delete();
            res.status(200).json(deletedProperty);
        }
        catch (error) {
            console.error(error.message);
            res.status(400).json(error);
        }
    }
}

module.exports = new PropertyController();
