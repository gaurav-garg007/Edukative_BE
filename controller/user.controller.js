const User = require("../models/user.modal");

const registerUser = async (req, res) => {
    try{
        const { username, email, password, role } = req.body;
        console.log(req.body);

        const user = await User.create({ userName: username, email, password, role });
        res.status(201).json({ message: "User registered successfully", user });
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req, res)=>{
    try{
        const { email, password } = req.body;

        const { token } = await User.verifyPassword(email, password);
        res.status(200).json({ message: "Login successful", token });
    }catch(error){
        res.status(500).json({ message: error.message })
    }
}

const userProfile = async (req, res) => {
    try{
        // get user info and send.
        const user = await User.findById(req.user.id);
        res.status(200).json({ message: "User profile fetched successfully", user });
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

module.exports = { registerUser, loginUser, userProfile };