import bcryptjs from "bcryptjs"
import { Item, ItemStock, Order, Unit } from "../models/ItemModel.js";
import { ItemVendor, MedicalVendor } from "../models/VendorModel.js";
import { medicalItem, medicalOrder, MedicalStock, Medicine, Potency } from "../models/MedicineModel.js";
import { Employee } from "../models/EmployeeModel.js";
import { Task } from "../models/TaskModel.js";
import { LeaveApplication } from "../models/LeaveApplyModel.js";
import { balanceDue, billPayment } from "../models/PaymentModel.js";
import { Appointment } from "../models/AppointmentModel.js";
export const details = async (req, res) => {

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
        const { fullname, username, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, password, branch, role } = req.body;
        const employeeExists = await Employee.findOne({ username });
        if (employeeExists) {
            res.json({ success: false, message: "Employee Already Exists" });
        }
        const hashedPassword = await bcryptjs.hash(password, 11);

        const newEmployee = new Employee({
            fullname, username, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, password: hashedPassword, branch, role
        })
        await newEmployee.save();
        res.json({
            success: true,
            newEmployee
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

export const update = async (req, res) => {
    try {
        const { fullname, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, branch, role } = req.body;

        const updatedUser = await Employee.findByIdAndUpdate(
            req.params.id,
            { fullname, email, phone, age, gender, bloodGroup, address, department, Salary, attendance, status, branch, role },
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
        let { startDate, endDate, reason, duration, username } = req.body;
        const EmployeeExist = await Employee.findOne({ username });

        if (!EmployeeExist) {
            res.json({ success: false, message: "This employee does not exist" });
        }
        const convertDateFormat = (dateString) => {
            const [year, month, date] = dateString.split('-');
            return `${parseInt(date)}-${parseInt(month)}-${parseInt(year)}`;
        };

        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day); // month is 0-indexed
        };

        startDate = convertDateFormat(startDate);
        endDate = convertDateFormat(endDate);
        duration = Math.abs(parseDate(endDate) - parseDate(startDate)) / (1000 * 60 * 60 * 24);
        const newLeave = new LeaveApplication({
            startDate,
            endDate,
            reason,
            duration,
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
            itemName: item
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

export const add_item_vendor = async (req, res) => {
    try {
        const { vendorname, contact, email, address } = req.body;
        const vendorexists = await ItemVendor.findOne({ vendorname, email });
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
            message: error.message
        })
    }
}
export const edit_vendor = async (req, res) => {
    try {
        const { id, vendorname, contact, email, address } = req.body;
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
        const itemexists = await Item.findOne({ itemName });
        const unitexists = await Unit.findOne({ unit });

        if (!itemexists || !unitexists) {
            return res.json({ success: false, message: "Stock does not have these" });
        }
        const newStock = new ItemStock({
            itemName,
            unit,
            quantity,
            branch: "Dombivali",
            receive_quantity: quantity,
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

// Get Item Stock
export const get_item_stock = async (req, res) => {
    try {
        const itemStock = await ItemStock.find({});
        return res.json({
            itemStock
        });
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message })
    }
}

export const updateItemStock = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Missing item ID" });
        }

        const updateData = {};

        if (req.body.docApproval_flag !== undefined) {
            updateData.docApproval_flag = req.body.docApproval_flag;
        }

        if (req.body.issue_quantity !== undefined) {
            const issueQty = Number(req.body.issue_quantity) || 0;
            updateData.issue_quantity = issueQty;
        }

        if (req.body.receive_quantity !== undefined) {
            updateData.receive_quantity = req.body.receive_quantity;
        }

        if (req.body.reorder_level !== undefined) {
            updateData.reorder_level = req.body.reorder_level;
        }
        if (req.body.last_updated !== undefined) {
            updateData.last_updated = req.body.last_updated;
        }

        if (req.body.quantity !== undefined && req.body.issue_quantity !== undefined) {
            const qty = Number(req.body.quantity) || 0;
            const issueQty = Number(req.body.issue_quantity) || 0;
            updateData.quantity = qty - issueQty;
        } else if (req.body.quantity !== undefined) {
            updateData.quantity = Number(req.body.quantity);
        }

        const updatedItem = await ItemStock.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.json({ success: true, updatedItem });

    } catch (error) {
        console.error("Error updating item stock:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const place_item_order = async (req, res) => {

    try {
        const { formRows } = req.body;

        let formattedDate = '';
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();
        if (!formRows || formRows.length === 0) {
            return res.status(400).json({ message: "Order items are required" });
        }


        const newOrder = new Order({ formRows, orderDate: formattedDate });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", newOrder });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }

}

export const get_Item_Order = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.find().populate('formRows.itemId');
        const branchOrders = orders.filter((order) => order?.formRows.map((row) => row?.itemId?.branch === id));
        res.json({
            branchOrders
        })
    } catch (error) {
        res.json({
            succes: false,
            message: error.message
        })
    }
}

export const updateReceivedOrder = async (req, res) => {
    try {
        const { itemId, orderId } = req.params;
        const { receivedQuantity, order_Delivered_Flag, doctor_Approval_Flag } = req.body;

        const order = await Order.findById(orderId);

        const item = order?.formRows.filter((order) => order?._id.toString() === itemId);
        if (receivedQuantity != undefined) {
            item[0].receivedQuantity = receivedQuantity;
        }
        if (order_Delivered_Flag != undefined) {
            item[0].order_Delivered_Flag = order_Delivered_Flag;
        }
        if (doctor_Approval_Flag != undefined) {
            item[0].doctor_Approval_Flag = doctor_Approval_Flag
        }
        await order.save();
        res.json({
            items: item[0]
        });
    } catch (error) {
        res.json({
            message: error.message,
            succes: false
        })
    }
}

export const addBillImage = async (req, res) => {
    try {
        let { orderId } = req.params;
        const order = await Order.findById(orderId);

        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        order.Bill.push({ imageUrl: base64Image });
        await order.save();

        res.json({
            success: true,
            message: 'Bill Uploaded Successfully'
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

export const getBillImage = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        const Images = order.Bill;
        res.json({
            Images,
            length: Images.length,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deleteBillImages = async (req, res) => {
    try {
        const { id, orderId } = req.params;
        const order = await Order.findById(orderId);
        order.Bill = order.Bill.filter((bill) => bill._id.toString() !== id)
        await order.save();
        
        res.json({
            message: "Deleted Successfully",
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message:error.message
       })
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

export const add_medical_vendor = async (req, res) => {
    try {
        const { vendorname, contact, email, address } = req.body;
        const vendorexists = await MedicalVendor.findOne({ vendorname, email });
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
            message: error.message
        })
    }
}
export const edit_medical_vendor = async (req, res) => {
    try {
        const { id, vendorname, contact, email, address } = req.body;
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
        const medicineexists = await Medicine.findOne({ medicine: medicineName });
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
        res.status(201).json({ message: "Order placed successfully", newOrder });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


//collections
export const getCollection = async (req, res) => {
    try {
        const { branch } = req.params;

        const collection = await billPayment.find().populate('patient').populate('paymentCollectedBy');
        const balancesDue = await balanceDue.find().populate('patient');
        const patientsCollection = collection.filter((item) => item?.patient?.branch === branch);
        const patientsDueBalances = balancesDue.filter((item) => item?.patient?.branch === branch);
        res.json({
            patientsCollection,
            patientsDueBalances
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}