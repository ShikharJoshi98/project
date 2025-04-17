import bcryptjs from "bcryptjs"
import { Item, ItemStock, Order, Unit } from "../models/ItemModel.js";
import { ItemVendor, MedicalVendor } from "../models/VendorModel.js";
import { medicalItem, medicalOrder, MedicalStock, Medicine, Potency } from "../models/MedicineModel.js";
import { Employee } from "../models/EmployeeModel.js";
import { Task } from "../models/TaskModel.js";
import { LeaveApplication } from "../models/LeaveApplyModel.js";
export const details= async (req, res) => {
    
    try {
        
        const detail = await Employee.find().select("-password");
        res.json({
            detail
         });
    } catch (error) {
        console.log(error.message);
    }
}

export const register = async (req, res) => {    
    try {
        const { fullname,username, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, password,branch ,role } = req.body;
        const employeeExists = await Employee.findOne({ username });
        if (employeeExists) {
            res.json({ success: false, message: "Employee Already Exists" });
        } 
        const hashedPassword = await bcryptjs.hash(password, 11);

        const newEmployee = new Employee({
            fullname, username, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, password: hashedPassword, branch, role
        })
        console.log(newEmployee);
        await newEmployee.save();
        res.json({
            success: true,
            newEmployee
        })
    } catch (error) {
        res.json({
            success: false,
            error:error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const { fullname, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status,branch ,role } = req.body;

        const updatedUser = await Employee.findByIdAndUpdate(
            req.params.id,
            { fullname, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status,branch ,role },
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

export const LeaveApply = async (req, res) => {
    try {
        let { startDate, endDate, reason, username,status } = req.body;
        const EmployeeExist = await Employee.findOne({ username });
        if (!EmployeeExist) {
            res.json({ success: false, message: "This employee does not exist" });
        }
        const convertDateFormat = (dateString) => {
            const [day, month, year] = dateString.split('-');
            return new Date(`${year}-${month}-${day}`);
        };

        startDate = convertDateFormat(startDate);
        endDate = convertDateFormat(endDate);
        const newLeave = new LeaveApplication({
            startDate,
            endDate,
            reason,
            username
        })
        await newLeave.save();
        res.json({
            success: true,
            newLeave
        })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
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
export const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json({
            items
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
export const getUnits = async (req, res) => {
    try {
        const units = await Unit.find();
        res.json({
            units
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
        const { vendorname,contact,email,address } = req.body;
        const vendorexists = await ItemVendor.findOne({ vendorname,email });
        if (vendorexists) {
            return res.json({ success: false, message: "Vendor already exists" });
        }
        const newVendor = new ItemVendor({
            vendorname,
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
export const get_vendor = async (req, res) => {
    try {
        const vendors = await ItemVendor.find();
        res.json({
            success: true,
            vendors
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message:error.message
        })
    }
}
export const edit_vendor = async (req, res) => {
    try {
        const { id,vendorname, contact, email, address } = req.body;
        const updatedVendor = await ItemVendor.findByIdAndUpdate(
             id,
            { vendorname, contact, email, address },
            { new: true, runValidators: true } // Return updated document
        );
        if (!updatedVendor) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedVendor);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}

export const add_item_stock = async (req, res) => {
    try {
        const { itemName, unit, quantity } = req.body;
        const itemexists = await Item.findOne({ itemName});
        const unitexists = await Unit.findOne({ unit });
        
        if (!itemexists || !unitexists) {        
        return res.json({ success: false, message: "Stock does not have these" });
    }
    const newStock = new ItemStock({
        itemName,
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
        const { items } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order items are required" });
        }
        const newOrder = new Order({ items });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully",  newOrder });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}

export const add_medicine = async (req, res) => {
    try {
        const { medicine } = req.body;
        const medicineexists = await Medicine.findOne({ medicine });
        if (medicineexists) {
            return res.json({ success: false, message: "Medicine already exists" });
        }
        const newMedicine = new Medicine({
            medicine
        })
        await newMedicine.save();
        res.json({
            success: true,
            newMedicine
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }   

}
export const getMedicine = async (req, res) => {
    try {
        const medicines = await Medicine.find();
        res.json({
            medicines
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
export const getPotency = async (req, res) => {
    try {
        const potencys = await Potency.find();
        res.json({
            potencys
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const add_potency = async (req, res) => {
    try {
        const { potency } = req.body;
        const potencyexists = await Potency.findOne({ potency });
        if (potencyexists) {
            return res.json({ success: false, message: "Potency already exists" });
        }
        const newPotency = new Potency({
            potency
        })
        await newPotency.save();
        res.json({
            success: true,
            newPotency
        })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }   

}

export const add_medical_vendor = async (req,res) => {
    try {
        const { vendorname,contact,email,address } = req.body;
        const vendorexists = await MedicalVendor.findOne({ vendorname,email });
        if (vendorexists) {
            return res.json({ success: false, message: "Vendor already exists" });
        }
        const newVendor = new MedicalVendor({
            vendorname,
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
export const get_medical_vendor = async (req, res) => {
    try {
        const vendors = await MedicalVendor.find();
        res.json({
            success: true,
            vendors
        })
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message:error.message
        })
    }
}
export const edit_medical_vendor = async (req, res) => {
    try {
        const { id,vendorname, contact, email, address } = req.body;
        const updatedVendor = await MedicalVendor.findByIdAndUpdate(
             id,
            { vendorname, contact, email, address },
            { new: true, runValidators: true } // Return updated document
        );
        if (!updatedVendor) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedVendor);
    } catch (error) {
        console.log(error.message);
        res.json({ error: error.message });
    }
}

export const add_medical_stock = async (req, res) => {
    try {
        const { medicineName, potency, quantity } = req.body;
        const medicineexists = await Medicine.findOne({ medicine:medicineName});
        const potencyexists = await Potency.findOne({ potency });
        
        if (!medicineexists || !potencyexists) {        
        return res.json({ success: false, message: "Stock does not have these" });
    }
    const newStock = new MedicalStock({
        medicineName,
        potency,
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

export const medical_items_order = async (req, res) => {
    const { medicine } = req.body;
    const newmedicine = new medicalItem({
        medicine
    })
    await newmedicine.save();
    res.json({ newmedicine });
}

export const medical_items_get = async (req, res) => {
    const medical_items = await medicalItem.find();
    res.json({ medical_items });
}

export const place_medical_order = async (req, res) => {
    
    try {
        const { medicine } = req.body;
        if (!medicine || medicine.length === 0) {
            return res.status(400).json({ message: "Order items are required" });
        }
        const newOrder = new medicalOrder({ medicine });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully",  newOrder });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}