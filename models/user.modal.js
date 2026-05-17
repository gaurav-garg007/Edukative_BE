const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = mongoose.Schema({
    userName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        select: false
    },
    phone: {
        type: String,
        required: false
    },
    role: { 
        type: String, 
        required: true,
        enum: ["admin", "user"]
    }
})

userSchema.pre("save", async function(){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 10);
    }
    // next();
})

userSchema.statics.verifyPassword = async function(email, password){
    const user = await this.findOne({email}).select("+password");
    if(!user) throw new Error("No user found with this email");

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("Incorrect password");

    const token = jwt.sign({
        id: user._id,
        role: user.role,
        email: user.email
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return { token };
}

const User = mongoose.model("User", userSchema);

module.exports = User;