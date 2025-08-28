import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({
    path: 'backend/config/config.env'
});
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/api/notes', notesRoutes);


const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});