import jsonWebToken from 'jsonwebtoken';

async function generateToken(user) {
    const payload = {
        id : user._id,
        Username: user.Username,
        email: user.email
    }

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is required for token generation');
    }

    const token = jsonWebToken.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

async function verifyToken(token) {
    try {
        const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
}

export { generateToken, verifyToken };

