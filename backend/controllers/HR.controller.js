import Doctor from "../models/doctorModel.js"
import bcryptjs from "bcryptjs"
import Receptionist from "../models/receptionistModel.js";
export const detail_doctors = async (req, res) => {
    
    try {
        const detail = await Doctor.find().select("-password");
        res.json({
            detail
         });
    } catch (error) {
        console.log(error.message);
    }
}

export const detail_receptionist = async (req, res) => {
    
    try {
        const detail = await Receptionist.find().select("-password");
        res.json({
            detail
         });
    } catch (error) {
        console.log(error.message);
    }
}

export const register_doctor = async (req, res) => {
    try {
        
   
    const { username, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, password, role, name } = req.body;
    const existDoctor = await Doctor.findOne({ email });
    if (existDoctor) {
        return res.json({ success: false, message: "Doctor already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 11);
    const newDoctor = new Doctor({
        username,
        email,
        phone,
        age,
        gender,
        bloodGroup,
        address,
        department,
        Salary,
        attendance,
        status,
        password: hashedPassword,
        role,
        name
    });
        await newDoctor.save();
        res.status(200).json({
            
            newDoctor:newDoctor._doc
        })
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const register_receptionist = async (req, res) => {
    try {
        
   
    const { fullname,username,email,phone,address,password,branch,role } = req.body;
    const existReceptionist = await Receptionist.findOne({ email });
    if (existReceptionist) {
        return res.json({ success: false, message: "Receptionist already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 11);
    const newReceptionist = new Receptionist({
        fullname,
        username,
        email,
        phone,
        address,        
        password: hashedPassword,
        branch,
        role
        
    });
        await newReceptionist.save();
        res.status(200).json({
            
            newReceptionist:newReceptionist._doc
        })
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
}

export const update = async (req, res) => {
    try {
        const { username, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, password, role, name } = req.body;
        const updatedUser = await Doctor.findByIdAndUpdate(
            req.params.id,
            { username, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, password, role, name },
            { new: true, runValidators: true } // Return updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}