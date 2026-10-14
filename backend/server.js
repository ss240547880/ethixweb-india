
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "10kb" }));

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { message: "Too many attempts. Please try again later." }
});

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    company: { type: String, trim: true, maxlength: 120, default: "" },
    service: { type: String, required: true, trim: true, maxlength: 100 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 3000 },
    status: {
      type: String,
      enum: ["new", "contacted", "closed"],
      default: "new"
    }
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { message: "Too many login attempts. Please try again later." }
});

app.post("/api/admin/login", adminLoginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !process.env.ADMIN_EMAIL ||
      !process.env.ADMIN_PASSWORD ||
      !process.env.JWT_SECRET
    ) {
      return res.status(400).json({ message: "Please enter valid login details." });
    }

    const emailMatches =
      email.trim().toLowerCase() ===
      process.env.ADMIN_EMAIL.trim().toLowerCase();

    const passwordHash = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    const passwordMatches = await bcrypt.compare(
      password,
      passwordHash
    );

    if (!emailMatches || !passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { role: "admin", email: process.env.ADMIN_EMAIL },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ token, message: "Login successful." });
  } catch (error) {
    console.error("Admin login error:", error.message);
    return res.status(500).json({ message: "Unable to log in right now." });
  }
});


app.get("/", (req, res) => {
  res.send("Ethixweb backend is running!");
});

app.post("/api/leads", enquiryLimiter, async (req, res) => {
  try {
    const { name, email, company = "", service, message, website = "" } = req.body;

    // Honeypot: silently ignore bot submissions
    if (typeof website === "string" && website.trim()) {
      return res.status(200).json({
        message: "Thank you! Your enquiry has been submitted."
      });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof company !== "string" ||
      typeof service !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({ message: "Please enter valid details." });
    }

    if (
      name.trim().length < 2 ||
      name.trim().length > 80 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      company.trim().length > 120 ||
      !service.trim() ||
      service.trim().length > 100 ||
      message.trim().length < 10 ||
      message.trim().length > 3000
    ) {
      return res.status(400).json({
        message: "Please check your form details and try again."
      });
    }

    await Lead.create({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      service: service.trim(),
      message: message.trim()
    });

    return res.status(201).json({
      message: "Thank you! Your enquiry has been submitted."
    });
  } catch (error) {
    console.error("Lead submission error:", error.message);
    return res.status(500).json({
      message: "Unable to submit your enquiry. Please try again."
    });
  }
});


function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Please log in first." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied." });
    }

    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired login. Please log in again." });
  }
}

app.get("/api/admin/leads", verifyAdmin, async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();
    return res.json(leads);
  } catch (error) {
    console.error("Fetching leads failed:", error.message);
    return res.status(500).json({ message: "Unable to fetch enquiries." });
  }
});

app.patch("/api/admin/leads/:id", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "contacted", "closed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    return res.json({ message: "Status updated.", lead });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid enquiry ID." });
    }

    console.error("Status update error:", error.message);
    return res.status(500).json({ message: "Unable to update status." });
  }
});


app.delete("/api/admin/leads/:id", verifyAdmin, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Enquiry not found." });
    }

    return res.json({ message: "Enquiry deleted successfully." });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid enquiry ID." });
    }

    console.error("Delete enquiry error:", error.message);
    return res.status(500).json({ message: "Unable to delete enquiry." });
  }
});



const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
