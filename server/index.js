import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { databaseConnection }
from "./config/dbConnection.js";

import resumeRoute
from "./routes/resume.routes.js";

import analysisRoute
from "./routes/analysis.routes.js";

import authRoutes
from "./routes/auth.routes.js";

import referralRoutes
from "./routes/referral.routes.js";

import applicationEmailRoutes
from "./routes/applicationEmail.routes.js";

import recommendationRoutes
from "./routes/recommendation.routes.js";

import interviewChatRoutes
from "./routes/interviewChat.routes.js";


dotenv.config({
    path: ".env"
});


const app = express();

const port =
    process.env.PORT || 3000;


// =========================================================
// MIDDLEWARE
// =========================================================

app.use(
    express.json({
        limit: "2mb"
    })
);


app.use(
    cors({

        origin:
            "http://localhost:5173",

        credentials: true
    })
);


// =========================================================
// DATABASE
// =========================================================

databaseConnection();


// =========================================================
// ROUTES
// =========================================================

app.use(
    "/api/resume",
    resumeRoute
);

app.use(
    "/api/analysis",
    analysisRoute
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/referral",
    referralRoutes
);

app.use(
    "/api/application-email",
    applicationEmailRoutes
);

app.use(
    "/api/recommendations",
    recommendationRoutes
);

app.use(
    "/api/interview-chat",
    interviewChatRoutes
);

// =========================================================
// SERVER
// =========================================================

app.listen(
    port,
    () => {

        console.log(
            `Server running on port ${port}`
        );
    }
);