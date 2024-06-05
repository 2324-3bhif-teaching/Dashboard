// for installing all dependencies once run 'npm install'
// for starting the server run 'npm start'
// for starting the server in watchmode run 'npm run server-dev'

// import modules
import express from "express";
import cors from "cors";
import { userRouter } from "../routers/userRouter";
import { projectRouter } from "../routers/projectRouter";
import { dashboardRouter } from "../routers/dashboardRouter";
import { authenticateJWT } from '../routers/middleware/userAuth';
import dotenv from 'dotenv';
import path from "node:path";

dotenv.config();

// create express application
const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// mount middleware
app.use(cors());
app.use(express.json());    // parse JSON data and place result in req.body
app.use(express.static(path.join(__dirname, '/public')));

// mount router(s)
app.use("/api/users", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/dashboard", dashboardRouter);

app.get('/dashboard', authenticateJWT, (_, res) => {
    res.send('This is the protected dashboard route.');
});

// start http server
app.listen(PORT, () => {
    console.log("Server listening on port 3000");
});