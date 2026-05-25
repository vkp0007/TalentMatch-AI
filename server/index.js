import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { databaseConnection } from './config/dbConnection.js';
import resumeRoute from "./routes/resume.routes.js";
import analysisRoute from "./routes/analysis.routes.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config({ path: '.env' });

const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// database connection
databaseConnection();



// routes

app.use("/api/resume", resumeRoute);
app.use("/api/analysis", analysisRoute);
app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});