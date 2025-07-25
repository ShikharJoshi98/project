import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import HRrouter from "./routes/HR.route.js";
import Docrouter from "./routes/Doctor.route.js";
import Recrouter from "./routes/Receptionist.route.js";
import PatientRouter from "./routes/patient.route.js";
dotenv.config();
const app = express();
connectDB();

//middlewares
app.use(express.json());
app.use(cors({origin: "http://localhost:5173", 
    credentials: true,}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', router);
app.use('/api/hr', HRrouter);
app.use('/api/doctor', Docrouter);
app.use('/api/receptionist', Recrouter);
app.use('/api/patient', PatientRouter);


//api endpoints
app.get('/', (req, res) => {
    res.send("api working");
})


app.listen(4000, () => {
    console.log("server listening on 4000");
})

