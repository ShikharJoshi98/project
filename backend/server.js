import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
connectDB();

//middlewares
app.use(express.json());
app.use(cors());
app.use('/api/auth', router);

//api endpoints
app.get('/', (req, res) => {
    res.send("Server working");
})


app.listen(4000, () => {
    console.log("server listening on 4000");
})

