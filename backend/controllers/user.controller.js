const { Property, User } = require('../models');
const bcrypt = require('bcrypt');

class UserController {
    async getUser(req, res) {
        try {
            const foundUser = await User
                .findById(req.params.id)
                .populate('properties');
            
            res.status(200).json(foundUser);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async getAllUsers(req, res) {
        try {
            const allUsers = await User.find().populate('properties');
            res.status(200).json(allUsers);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async createUser(req, res) {
        try {
            const newUser = new User(req.body);
            
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async loginUser(req, res) {
        try {
            let foundUser = await User
                .findOne({ email: req.body.email })
                .select('+password');
            
            const validPassword = await bcrypt.compare(req.body.password, foundUser.password);
            
            if (validPassword) {
                foundUser = await User.findById(foundUser._id);
                res.status(200).json(foundUser);
            }
            else {
                res.status(400).json(new Error('Invalid password!'));
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async updateUser(req, res) {
        try {
            const updatedUser = {
                _id: req.params.id,
                ...req.body
            };

            await User.updateOne(
                { _id: updatedUser._id },
                { $set: updatedUser }
            );
            
            res.status(200).json(updatedUser);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    
    async deleteUser(req, res) {
        try {
            const userToDelete = await User.findById(req.params.id);
            
            await Property.deleteMany(
                { _id: { $in: userToDelete.properties } }
            );
            
            const deletedUser = await userToDelete.delete();
            res.status(200).json(deletedUser);
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = new UserController();
