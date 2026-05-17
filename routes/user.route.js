const express = require('express');
const { registerUser, loginUser, userProfile } = require('../controller/user.controller');
const { verifyToken } = require('../middleware/tokenVerify');

const Route = express.Router();

Route.post("/register", registerUser);
Route.post("/login", loginUser);
// Route.get("/profile", userProfile)
Route.get("/profile", verifyToken, userProfile);

module.exports = Route;