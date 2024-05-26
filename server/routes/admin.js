const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Patient = require("../models/Patient"); // Adjust the path as needed
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

/**
 *
 * Check Login
 */
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

/**
 * GET /
 * Admin - Login Page
 */
router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Admin - Check Login
 */
router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin Dashboard
 */
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Dashboard",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    const data = await Patient.find();
    res.render("admin/dashboard", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin - Create New Post
 */
router.get("/add-post", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Post",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    const data = await Post.find();
    res.render("admin/add-post", {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

// Assuming you have a Patient model similar to the one created earlier

/**
 * GET /
 * Admin - Add New Patient
 */
router.get("/add-patient", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add Patient",
      description:
        "Patient Management System created with NodeJs, Express & MongoDb.",
    };

    res.render("admin/add-patient", {
      locals,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * POST /
 * Admin - Add New Patient
 */
router.post("/add-patient", authMiddleware, async (req, res) => {
  try {
    const newPatient = new Patient({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      contactNumber: req.body.contactNumber,
      habitsAndInstincts: req.body.habitsAndInstincts,
      medicalHistory: req.body.medicalHistory,
      complaint: req.body.complaint,
      diagnosis: req.body.diagnosis,
      testsAndImaging: req.body.testsAndImaging,
      treatment: req.body.treatment,
      reviewDate: req.body.reviewDate,
      followUp: req.body.followUp,
    });

    await newPatient.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin - Edit Patient
 */
router.get("/edit-patient/:id", authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Edit Patient",
      description: "Patient Management System",
    };

    const data = await Patient.findOne({ _id: req.params.id });

    res.render("admin/edit-patient", {
      locals,
      data,
      layout: adminLayout,
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * PUT /
 * Admin - Edit Patient
 */
router.put("/edit-patient/:id", authMiddleware, async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      contactNumber: req.body.contactNumber,
      habitsAndInstincts: req.body.habitsAndInstincts,
      medicalHistory: req.body.medicalHistory,
      complaint: req.body.complaint,
      diagnosis: req.body.diagnosis,
      testsAndImaging: req.body.testsAndImaging,
      treatment: req.body.treatment,
      reviewDate: req.body.reviewDate,
      followUp: req.body.followUp,
      updatedAt: Date.now(),
    });

    res.redirect(`/edit-patient/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
});

/**
 * DELETE /
 * Admin - Delete Patient
 */
router.delete("/delete-patient/:id", authMiddleware, async (req, res) => {
  try {
    await Patient.deleteOne({ _id: req.params.id });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Admin Logout
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  //res.json({ message: 'Logout successful.'});
  res.redirect("/");
});

module.exports = router;
