const express = require('express');
const cors = require('cors');

const UserRoute = require('./routes/user.route');
const CourseRoute = require('./routes/course.route');

const app = express();

app.use(cors({
    origin: "*",
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/courses", CourseRoute);

module.exports = app;