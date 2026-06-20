const mongoose = require("mongoose");
const express = require("express");
const connectDB = require("./config/db");
const Complaint = require("./models/Complaint");
const complaintRoutes = require("./routes/complaintRoutes");
const userRoutes = require("./routes/userRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");

const app = express();


app.use(cors());

connectDB();

app.use(express.json());
app.use("/notices", noticeRoutes);
app.use("/auth", userRoutes);
app.use("/dashboard", dashboardRoutes);
mongoose.connect("mongodb://localhost:27017/hostel-management")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use("/complaints", complaintRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});