const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const nodemailer = require('nodemailer'); 

// Register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,         
                username: user.username,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            message: "Login successful",
            token: token
          });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/forgot-password', async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ Status: "User not existed" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOTP = otp;
        user.resetOTPExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email, 
            subject: 'Your Password Reset OTP',
            text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.status(500).send({ Status: "Server error" });
            } else {
                return res.send({
                    Status: "OTP sent successfully",
                    otp: otp 
                });
            }
          });
        } catch (error) {
            console.error("Error in forgot-password:", error);
            return res.status(500).send({ Status: "Server error" });
        }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email, resetOTP: otp, resetOTPExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ Status: "Invalid or expired OTP" });
        }

        user.password = newPassword;
        user.resetOTP = undefined;  
        user.resetOTPExpires = undefined;
        await user.save();

        res.send({ Status: "Password reset successful" });
    } catch (error) {
        console.error("Error in reset-password:", error);
        res.status(500).send({ Status: "Error resetting password" });
    }
});

router.post('/validate-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email, resetOTP: otp, resetOTPExpires: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ Status: "Invalid or expired OTP" });
        }

        res.json({ Status: "OTP validated" });
    } catch (error) {
        console.error("Error in validate-otp:", error);
        res.status(500).send({ Status: "Error validating OTP" });
    }
});

module.exports = router;
