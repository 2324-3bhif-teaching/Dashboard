import express from "express";
import {adminRouter} from "../routers/adminRouter";
import dotenv from "dotenv";
import cors from "cors";
import path from "node:path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

// mount middleware
app.use(cors());
app.use(express.json());    // parse JSON data and place result in req.body
app.use(express.static(path.join(__dirname, '/public')));

app.use("/api/admin", adminRouter);

app.get("/api/admin", (_, res) => {
    res.send("Hello Admin!");
})

// start http server
app.listen(PORT, () => {
    console.log("Server listening on port 4000");
});