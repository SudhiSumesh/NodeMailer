const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();

//user registration route
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User sucessfully Registerd",
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
});
//user login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Authentification faild" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentification faild" });
    }
    const token = jwt.sign({ useId: user._id }, "secret_ID_123", {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "faild" });
  }
});
//forgot password
router.post("/forgotpassword", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Authentification faild" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const addOtp = await User.findByIdAndUpdate(user._id, {
      otp: otp,
    });
    if (addOtp) {
      sendEmail(username, otp);
      res.status(201).json({ message: "otp sended to mail" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "faild" });
  }
});
// update password
router.post("/validate", async (req, res) => {
try {
    const {  username,password, otp } = req.body;
  const user =await User.findOne({username});
  if (!user) {
    return res.send("User not found");
  }
  if(otp==user.otp){
 const hashedPassword =await bcrypt.hash(password, 10);
const updatedPassword=     await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
    if(updatedPassword){
    return res.status(201).json({ message: "Password updated" });
    }
  }
res.status(500).json({error:"error"})

} catch (error) {
    console.log(error);
    res.status(401).json({error:'error'})
}  
});
module.exports = router;
