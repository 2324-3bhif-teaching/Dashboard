// for installing all dependencies once run 'npm install'
// for starting the server run 'npm start'
// for starting the server in watchmode run 'npm run server-dev'

// import modules
import express from "express";
import cors from "cors";
import { userRouter } from "./Routers/userRouter";
import { projectRouter } from "./Routers/projectRouter";
import { dashboardRouter } from "./Routers/dashboardRouter";

// create express application
const app = express();

// mount middleware
app.use(cors());
app.use(express.json());    // parse JSON data and place result in req.body

// mount router(s)
app.use("/api/users", userRouter);
app.use("/api/project", projectRouter);
app.use("/api/dashboard", dashboardRouter);

// start http server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});