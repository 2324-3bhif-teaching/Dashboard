// for installing all dependencies once run 'npm install'
// for starting the server run 'npm start'
// for starting the server in watchmode run 'npm run server-dev'

// import modules
import express from "express";
import cors from "cors";
import { projectRouter } from "../routers/projectRouter";
import { dashboardRouter } from "../routers/dashboardRouter";
import dotenv from 'dotenv';
import path from "node:path";
import {initWebSocket} from "../routers/middleware/websocket";
import * as http from "node:http";

dotenv.config();

// create express application
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// mount middleware
app.use(cors());
app.use(express.json());    // parse JSON data and place result in req.body
app.use(express.static(path.join(__dirname, '/public')));

initWebSocket(server);

// mount router(s)
app.use("/api/project", projectRouter);
app.use("/api/dashboard", dashboardRouter);

// start http server
app.listen(PORT, () => {
    console.log("Server listening on port 4000");
});