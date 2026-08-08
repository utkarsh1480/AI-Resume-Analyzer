import express from 'express';
import dotenv from 'dotenv'
import db  from './config/db_connection.js';
import cookieParser from 'cookie-parser';
import authrouter from './routes/auth.routes.js';
dotenv.config()
import cors from 'cors'
import interviewRouter from './routes/interview.routes.js';
db();


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

/* require all the routes*/



/* using all the routes*/
app.use('/api/auth', authrouter);
app.use('/api/interview', interviewRouter)



export default app;


