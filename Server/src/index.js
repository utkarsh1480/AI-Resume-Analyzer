import 'dotenv/config';
import express from 'express';
import db from './config/db_connection.js';
import cookieParser from 'cookie-parser';
import authrouter from './routes/auth.routes.js';
import cors from 'cors';
import interviewRouter from './routes/interview.routes.js';

db();


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:3000"
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            const normalizedOrigin = origin.replace(/\/$/, '');
            const isAllowed = allowedOrigins.some(o => o && o.replace(/\/$/, '') === normalizedOrigin);
            if (isAllowed || process.env.NODE_ENV !== 'production') {
                return callback(null, true);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running' });
});

/* using all the routes*/
app.use('/api/auth', authrouter);
app.use('/api/interview', interviewRouter);



export default app;


