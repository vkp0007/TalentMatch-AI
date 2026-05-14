import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { databaseConnection } from './config/dbConnection.js';
import resumeRoute from "./routes/resumeRoutes.js";

dotenv.config({ path: '.env' });

const app = express();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());

// database connection
databaseConnection();



// routes
app.get('/', (req, res) => {
  res.send('TalentMatch AI API Running');
});

app.use("/api/resume", resumeRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});