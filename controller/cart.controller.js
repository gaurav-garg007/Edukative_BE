const Cart = require("../models/cart.models");
const Course = require("../models/course.model");

const addToCart = async (req, res) => {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    try{
        let resp = await Cart.create({ userId, courses: courseId });
        res.status(200).json({ message: "Item added to cart"});
    } catch(error){
        res.status(500).json({ message: error.message });
    }
}

const getCartList = async (req, res) => {
    let userId = req.user.id;

    try{
        let response = await Cart.find({ userId });

        if(response.length === 0 ){
            return res.status(200).json({ 
                message: "no item in cart", 
                items: [],
                totalCount: 0
            });
        }
        return res.status(200).json({ 
            message: "Cart fetched", 
            items: response,
            totalCount: response.length
        });

    } catch(error){
        res.status(500).json({error})
    }
}

const getCartDetails = async (req, res) => {
    const userId = req.user.id;
    try{
        let response = await Cart.find({ userId });

        if(response.length === 0 ){ 
            return res.status(200).json({  message: "no item in cart",  items: [], totalCount: 0 });
        }

        let courseHash = {};
        response.forEach(item => {
            const courseId = item.courses.toString();
            courseHash[courseId] = (courseHash[courseId] || 0) + 1;
        });
        let ids = Object.keys(courseHash);
        let courseData = await Course.find(
            { _id: { $in: ids }}
        ).select("title thumbnail price description discount");

        res.status(200).json({ message: "Course list details fetched", items: courseData })
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

const removeCourse = async (req, res) => {
    try{
        let userId = req.user.id;
        let courseId = req.params.courseId;
        let resp = await Cart.findOneAndDelete({ userId, courses: courseId });

        res.status(200).json({ message: "Course removed from cart" })
    } catch(error){
        res.status(500).json({error: error.message})
    }
}

module.exports = { addToCart, getCartList, getCartDetails, removeCourse };