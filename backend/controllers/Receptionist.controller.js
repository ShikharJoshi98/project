import bcryptjs from "bcryptjs";
import Patient from "../models/PatientModel.js";

export const register = async (req, res) => {
    try {
        const { fullname,phone,Altphone,email,branch } = req.body;
        
        function usernameCreator(newName,newPhone){
            let text = "";
            let firstName = newName.split(" ")[0]||"";
            let num = String(newPhone);
            text = firstName + num.slice(num.length - 4);
            return text;
        }
        const password = "DOM" + "-" + usernameCreator(fullname, phone);
        const username = usernameCreator(fullname, phone);
        const existPatient = await Patient.findOne({ username });
        if (existPatient) {
            return res.status(400).json({success:false,message:"Already exists."})
        }
        const hashedPassword = await bcryptjs.hash(password, 11);
        const newPatient = new Patient({
            username,fullname,phone,Altphone,email,password:hashedPassword,  branch
        })
        await newPatient.save();
        res.status(200).json({ newPatient: {
            ...newPatient._doc,
            password:undefined
    } });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export const updatePatient = async (req, res) => {
    try {
            const { imageData,username,casePaperNo,fullname,age, gender,address,phone,Altphone,email,qualification,occupation,dietaryPreference,weight,bloodPressure,maritalStatus,referredBy,branch } = req.body;
            
            const updatedpatient = await Patient.findByIdAndUpdate(
                req.params.id,
                { imageData,username,casePaperNo,fullname,age, gender,address,phone,Altphone,email,qualification,occupation,dietaryPreference,weight,bloodPressure,maritalStatus,referredBy,branch },
                { new: true, runValidators: true } 
            );
            if (!updatedpatient) {
                return res.status(404).json({ message: "Patient not found" });
            }
            res.json(updatedpatient);
    
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
    
        }
}
export const getPatients = async(req,res)=> {
    try {
        const patients = await Patient.find();
        if(patients){
        res.json({
            success:true, patients
        })
        }
        else {
            res.json({
                success: false,message:"No Data"
            })
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}