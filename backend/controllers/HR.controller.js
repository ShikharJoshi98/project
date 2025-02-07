import Doctor from "../models/doctorModel.js"
import bcryptjs from "bcryptjs"
export const details = async (req, res) => {
    
    try {
        const detail = await Doctor.find().select("-password");
        res.json({
            detail
         });
    } catch (error) {
        console.log(error.message);
    }
}

export const register = async (req, res) => {
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
export const update = async (req, res) => {
    try {
        const { username, status } = req.body;
        const updatedUser = await Doctor.findByIdAndUpdate(
            req.params.id,
            { username, status },
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