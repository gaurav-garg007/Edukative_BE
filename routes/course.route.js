const express = require('express');
const Route = express.Router();
const { createCourse, getAllCourses, getSingleCourse, uploadImage } = require('../controller/course.controller');
const { addToCart, getCartList, getCartDetails, removeCourse } = require("../controller/cart.controller")
const { upload } = require('../config/flieUpload');
const { verifyToken } = require('../middleware/tokenVerify');

Route.post("/upload", upload.single('image'), uploadImage);
Route.post("/create", createCourse);
Route.get("/all", getAllCourses);
Route.get("/course/:id", getSingleCourse);

// cart
Route.post("/cart-add/:courseId", verifyToken, addToCart)
Route.get("/get-cart", verifyToken, getCartList);
Route.get("/get-cart-details", verifyToken, getCartDetails);
Route.delete("/cart-remove/:courseId", verifyToken, removeCourse)

module.exports = Route;