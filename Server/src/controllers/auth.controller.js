import User from './../Model/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/user.auth.js';
import blacklistModel from '../Model/blacklist.js';
/**
 * @route Post /ap/auth//register
 * @description register a new user
 * @access public
 */

async function registerUser(req, res) {
    const { Username, email, password } = req.body;
    if (!Username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }
    const existingUser = await User.findOne({ $or: [{ Username }, { email }] });
    if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "Username or email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            Username,
            email,
            password: hash
        })
        const token = await generateToken(user);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
        });
        res.status(201).json({
            success: true,
            message: "user registered successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user registration failed",
            error: error.message
        })
    }
}

/**
 * @route Post /ap/auth//login
 * @description login a user
 * @access public
 */

async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields"
        })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            })
        }
        const token = await generateToken(user);
        const isblacklisted = await blacklistModel.findOne({ token });
        if (isblacklisted) {
            return res.status(401).json({
                success: false,
                message: "Token is blacklisted. Please login again."
            });
        }
        res.cookie('token', token);
        res.status(200).json({
            success: true,
            message: "user logged in successfully",
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "user login failed",
            error: error.message
        })
    }
}

/**
 * @route Post /ap/auth/logout
 * @description logout a user
 * @access public
 */
async function logoutUser(req, res) {
    const token = req.cookies.token; // Assuming the token is stored in a cookie
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "No token provided"
        });
    }

    // Add the token to the blacklist
    await blacklistModel.create({ token });

    res.clearCookie('token', { sameSite: 'none', secure: process.env.NODE_ENV === 'production' });
    res.status(200).json({
        success: true,
        message: "user logged out successfully"
    });
}

/**
 * @route Get /api/auth/get-me
 * @description get the logged in user
 * @access private
 */
async function getMe(req, res) {
    return res.status(200).json({
        success: true,
        user: req.user
    });
}

export { registerUser, loginUser, logoutUser, getMe };