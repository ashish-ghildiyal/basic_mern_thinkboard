import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import { rateLimiter } from './middleware/rateLimiter.js';
import cors from 'cors';
dotenv.config({
    path: 'backend/config/config.env'
});
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Custom Middleware for Rate Limiting

app.use(rateLimiter);
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/notes', notesRoutes);


const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});