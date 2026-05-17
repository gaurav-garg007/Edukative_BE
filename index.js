const app = require("./app.js");
const  mongoose = require("mongoose");
require("dotenv").config();

const String = process.env.MONGO_DB;
const PORT = process.env.PORT || 3000;

const startApp = async () => {
    try {
        if(!mongoose.connection.readyState) {
            await mongoose.connect(String);
            console.log("MongoDB Connected");
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

startApp();