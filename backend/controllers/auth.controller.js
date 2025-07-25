import Patient from "../models/PatientModel.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail } from "../utils/sendPasswordReset.js";
import { sendResetSuccessEmail } from "../utils/sendResetSuccessful.js";
import { Employee } from "../models/EmployeeModel.js";

export const register = async (req, res) => {
    try {
        const { fullname, phone, Altphone, email, username, lastLogin, password, branch } = req.body;
        const isBranch = branch === 'Mulund' ? 'MUL' : 'DOM';
        const existUser = await Patient.findOne({ username });
        if (existUser) {
            return res.status(400).json({ success: false, message: "Already exists try logging in." })
        }
        const hashedPassword = await bcryptjs.hash(password, 11);
        const newUser = new Patient({
            fullname,casePaperNo:`${isBranch}-NEW`, phone, Altphone, email, username, lastLogin, password: hashedPassword, branch
        })
        await newUser.save();
        generateTokenAndSetCookie(res, newUser._id);
        res.status(200).json({
            newUser: {
                ...newUser._doc,
                password: undefined
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (role === 'patient') {
            const user = await Patient.findOne({ username });
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid Credentials." });
            }
            const isPasswordValid = await bcryptjs.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Password incorrect" });
            }
            generateTokenAndSetCookie(res, user._id, role);
            user.lastLogin = new Date();
            await user.save();
            res.status(200).json({
                success: true, message: "Logged in Successfully", User: {
                    ...user._doc,
                    password: undefined,
                    role: "patient"
                }
            });
        }
        else {
            const user = await Employee.findOne({ username, role });
            if (!user) {
                return res.status(400).json({ success: false, message: "Invalid Credentials." });
            }
            const isPasswordValid = await bcryptjs.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Password incorrect" });
            }
            generateTokenAndSetCookie(res, user._id, role);
            user.lastLogin = new Date();
            await user.save();
            res.status(200).json({
                success: true, message: "Logged in Successfully", User: {
                    ...user._doc,
                    password: undefined
                }
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await Patient.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: "User not found" });
        }
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        await sendPasswordResetEmail(user.email, `http://localhost:5173/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            message: "A password reset link send through the email"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await Patient.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired Session"
            })
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();
        await sendResetSuccessEmail(user.email);
        res.status(200).json({
            success: true,
            message: "Password reset successful"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const checkAuth = async (req, res) => {
    try {
        if (!req.role || !req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized - missing role or user ID" });
        }
        let user;
        if (req.role === 'patient') {
            user = await Patient.findById(req.userId).select("-password");
            if (user) {
                res.status(200).json({ success: true, user });
            }
        } else {
            user = await Employee.findById(req.userId).select("-password");

            if (req.role === user.role) {
                res.status(200).json({ success: true, user });
            }
            else {
                return res.status(400).json({ success: false, message: "Not found" });
            }
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
