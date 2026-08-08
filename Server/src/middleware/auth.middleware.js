import { verifyToken } from '../services/user.auth.js';
import blacklistModel from '../Model/blacklist.js';

/**
 * Middleware to authenticate the user using JWT token
 */
async function authenticate(req, res, next) {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await blacklistModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ success: false, message: 'Token is blacklisted. Please login again.' });
        }
        
        const decoded = await verifyToken(token);
        
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token', error: error.message });
    }
}

export default authenticate;