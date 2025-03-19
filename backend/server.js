import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import dotenv from "dotenv";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import HRrouter from "./routes/HR.route.js";
import Docrouter from "./routes/Doctor.route.js";
import Recrouter from "./routes/Receptionist.route.js";
import { AppointmentDoctor } from "./models/AppointmentModel.js";
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


//api endpoints
app.get('/', (req, res) => {
    res.send("Server working");
})

app.get("/test-api", async (req, res) => {
    try {

        const appointment = await AppointmentDoctor.find({AppointmentType:"general"}).populate('PatientCase').populate('Doctor');

        // const patientCases = appointment.map(appointment => appointment.PatientCase).reverse();

        return res.json(appointment);       
    } catch (error) {
        console.log("Error in test API", error.message);
        return res.json({
            message: error.message
        });
    }
})


app.listen(4000, () => {
    console.log("server listening on 4000");
})

