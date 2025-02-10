import Doctor from "../models/doctorModel.js"
import bcryptjs from "bcryptjs"
import Receptionist from "../models/receptionistModel.js";
import { Item, ItemStock, Order, Unit } from "../models/ItemModel.js";
import { ItemVendor } from "../models/VendorModel.js";
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

export const update_doctor = async (req, res) => {
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
        console.log(error.message);
        res.status(500).json({ error: error.message });

    }
}

export const update_receptionist = async (req, res) => {
    try {
        const { fullname, phone,email,  address, branch } = req.body;
        const updatedUser = await Receptionist.findByIdAndUpdate(
            req.params.id,
            { fullname, phone,email,  address, branch },
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

export const add_item = async (req, res) => {
    try {
        const { item } = req.body;
        const itemexists = await Item.findOne({ item });
        if (itemexists) {
            return res.json({ success: false, message: "Item already exists" });
        }
        const newItem = new Item({
            itemName:item
        })
        await newItem.save();
        res.json({
            success: true,
            newItem
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }   

}

export const add_unit = async (req, res) => {
    try {
        const { unit } = req.body;
        const unitexists = await Unit.findOne({ unit });
        if (unitexists) {
            return res.json({ success: false, message: "Unit already exists" });
        }
        const newUnit = new Unit({
             unit
        })
        await newUnit.save();
        res.json({
            success: true,
            newUnit
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }   

}

export const add_item_vendor = async (req,res) => {
    try {
        const { name,contact,email,address } = req.body;
        const vendorexists = await ItemVendor.findOne({ name,email });
        if (vendorexists) {
            return res.json({ success: false, message: "Vendor already exists" });
        }
        const newVendor = new ItemVendor({
            vendorname: name,
            contact,
            email,
            address
        })
        await newVendor.save();
        res.json({
            success: true,
            newVendor
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    } 
}

export const add_item_stock = async (req, res) => {
    try {
        const { item, unit, quantity } = req.body;
        const itemexists = await Item.findOne({ itemName:item });
        const unitexists = await Unit.findOne({ unit });
        
        if (!itemexists || !unitexists) {
        
        return res.json({ success: false, message: "Stock does not have these" });
    }
    const newStock = new ItemStock({
        itemName:item,
        unit,
        quantity
    })
    await newStock.save();
    res.json({
        success: true,
        newStock
    })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
    

}

export const place_item_order = async (req, res) => {
    
    try {
        const { itemName, vendor, quantity,unit, orderDate, deliveryDate } = req.body;
        const itemexists = await Item.findOne({ itemName });
        const unitexists = await Unit.findOne({ unit });
        const vendorexists = await ItemVendor.findOne({ vendorname: vendor });
        if (!itemexists || !unitexists || !vendorexists) {
            return res.json({ success: false, message: "Enter appropraite fields" });
        }
        const newOrder = new Order({
            itemName,
            vendor,
            quantity,
            unit,
            orderDate,
            deliveryDate
        })
        await newOrder.save();
        res.json({
            success: true,
            newOrder
        }) 
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}