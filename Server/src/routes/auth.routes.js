import express from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/auth.controller.js";
import authenticate from "../middleware/auth.middleware.js";
const Router = express.Router();


/**
 * @route Post /api/auth/register
 * @description register a new user
 * @access public 
 */
Router.post('/register', registerUser);

/**
 * @route Post /api/auth/login
 * @description login a user
 * @access public 
 */
Router.post('/login', loginUser);

/**
 * @route Post /api/auth/logout
 * @description logout a user
 * @access private 
 */
Router.post('/logout', authenticate, logoutUser);

/** 
 * @route Get /api/auth/get-me
 * @description get the logged in user
 * @access private
 */
Router.get('/get-me', authenticate, getMe);

export default Router;