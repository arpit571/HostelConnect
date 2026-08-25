require("dotenv").config();

console.log(
  "Gemini API key loaded:",
  Boolean(process.env.GEMINI_API_KEY)
);

const express = require("express");
const connectDB = require("./config/db");

const complaintRoutes = require("./routes/complaintRoutes");
const complaintEvidenceRoutes = require("./routes/complaintEvidenceRoutes");

const userRoutes = require("./routes/userRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const aiComplaintRoutes = require("./routes/aiComplaintRoutes");

const cors = require("cors");

const app = express();

app.use(cors());

connectDB();

app.use(express.json());

app.use("/notices", noticeRoutes);
app.use("/auth", userRoutes);
app.use("/dashboard", dashboardRoutes);

app.use("/complaints", complaintRoutes);
app.use("/complaints", complaintEvidenceRoutes);

app.use("/api/ai", aiComplaintRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});