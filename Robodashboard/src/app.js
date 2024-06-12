"use strict";
// for installing all dependencies once run 'npm install'
// for starting the server run 'npm start'
// for starting the server in watchmode run 'npm run server-dev'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import modules
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("../routers/userRouter");
const projectRouter_1 = require("../routers/projectRouter");
const dashboardRouter_1 = require("../routers/dashboardRouter");
const userAuth_1 = require("../routers/middleware/userAuth");
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
dotenv_1.default.config();
// create express application
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY || 'default_secret_key';
// mount middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // parse JSON data and place result in req.body
app.use(express_1.default.static(node_path_1.default.join(__dirname, '/public')));
// mount router(s)
app.use("/api/users", userRouter_1.userRouter);
app.use("/api/project", projectRouter_1.projectRouter);
app.use("/api/dashboard", dashboardRouter_1.dashboardRouter);
app.get('/dashboard', userAuth_1.authenticateJWT, (_, res) => {
    res.send('This is the protected dashboard route.');
});
// start http server
app.listen(PORT, () => {
    console.log("Server listening on port 3000");
});
