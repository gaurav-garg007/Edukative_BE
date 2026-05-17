const { uploadToCloudinary } = require('../config/flieUpload');
const Cart = require('../models/cart.models');
const Course = require('../models/course.model');

const createCourse = async (req, res) => {
    try{
        let course = req.body;
        await Course.create(course);
        res.status(201).json({ message: "Course created successfully" });
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

const getAllCourses = async (req, res) => {
    try{
        const courses = await Course.find({});
        res.status(200).json({ message: "Courses retrieved successfully", courses });
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const getSingleCourse = async (req, res) => {
    try{
        const course = await Course.findById(req.params.id);
        if(!course){
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ message: "Course retrieved successfully", course });
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const uploadImage = async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({ message: "No file uploaded" });
        }

        const response = await uploadToCloudinary(req.file.path);
        const imageUrl = response.secure_url;
        const publicUrl = response.public_id;

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}



module.exports = { createCourse, getAllCourses, getSingleCourse, uploadImage };