import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { youthmodel } from "./youthschema.js";
import mongoose from "mongoose";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
const mongouri="mongodb+srv://aadi:Adarsh1442005@cluster0.nc0yl.mongodb.net/iskonazamgarh=Cluster0";
//mongodb connection
async function connectDB() {
  try {
    await mongoose.connect(mongouri
    );
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Connection error:", err);
  }
}

connectDB();
//youth adminid and password
const ADMIN_ID = "admin123";
const ADMIN_PASSWORD = "secret123";

//youth request
const youth=async (req, res) => {
  const formdata = req.body;
  const newentry=new youthmodel(formdata);
  await newentry.save();
  console.log("✅ Received form data:", formdata);

  // Here you could save to a database (MongoDB, PostgreSQL, etc.)
  res.json({
    message: "Form received successfully!",
    data: formdata,
  });
}
//youth frontend req
const frontyouth=async (req, res) => {
  try {
    const youths = await youthmodel.find();
    res.json(youths);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
}
//youth delete
 const youthdel=async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const result = await youthmodel.findOneAndDelete({ email });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", deleted: result });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
}
//youth admin
const youthadmin=async (req, res) => {
  const { loginId, password } = req.body;

  if (loginId === ADMIN_ID && password === ADMIN_PASSWORD) {
    // Send back a "code" (could be JWT or session token in real apps)
    res.json({ success: true, code: "ACCESS_GRANTED_2025" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}


//youth route
app.delete("/api/youths/:email",youthdel);
app.post("/api/youth-form", youth);
app.get("/api/youths",frontyouth);
app.post("/api/admin/login",youthadmin );




// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});