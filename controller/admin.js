const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({ message: "admin fields cannot be empty" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const admin = await Admin.create(req.body);
    return res.status(200).json({
      success: true,
      message: "admin account successfully created",
      token,
      data: admin,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This admin user already exists",
      });
    }
    return res.status(400).json({
      error: error.message,
    });
  }
};

const signInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and password" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await admin.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "180s",
    });
    return res.status(200).json({
      success: true,
      message: "admin user succesfully signin",
      token,
      data: admin,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  signInAdmin,
};
