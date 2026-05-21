const User = require("../Models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, try to login",
      });
    }

    const hash = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, hash);

    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    res.status(200).json({
      success: true,
      message: "Registration Successful!!",
      data: newlyCreatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to Register the User...",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exists, try to register",
      });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }
    const accessToken = jwt.sign(
      {
        userId: existingUser._id,
        username: existingUser.username,
        role: existingUser.role,
      },
      "JWT_SECRET_KEY",
      { expiresIn: "15m" },
    );

    res.status(200).json({
      success: true,
      message: "User login succesfully!!",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to login the User...",
    });
  }
};

module.exports = { register, login };
