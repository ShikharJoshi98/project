import bcryptjs from "bcryptjs"
import { Item, ItemStock, Order, OrderId, Unit } from "../models/ItemModel.js";
import { ItemVendor, MedicalVendor } from "../models/VendorModel.js";
import { medicalItem, medicalOrder, MedicalOrderId, MedicalStock, Medicine, Potency } from "../models/MedicineModel.js";
import { Employee } from "../models/EmployeeModel.js";
import { Task } from "../models/TaskModel.js";
import { LeaveApplication } from "../models/LeaveApplyModel.js";
import { billPayment, courierPayment } from "../models/PaymentModel.js";
import { Appointment } from "../models/AppointmentModel.js";
import { updateDate } from "../utils/todayDate.js";
import Patient from "../models/PatientModel.js";
import { sendCourierPatientEmail, sendMedicalVendorOrderEmail, sendVendorOrderEmail } from "../utils/sendPaymentDetails.js";

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
            return;
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

        res.status(500).json({ error: error.message });

    }
}

export const LeaveApply = async (req, res) => {
    try {
        let { startDate, halfDayDate, endDate, type, reason, duration, employee } = req.body;

        const convertDateFormat = (dateString) => {
            const [year, month, date] = dateString.split('-');
            return `${parseInt(date)}-${parseInt(month)}-${parseInt(year)}`;
        };

        const parseDate = (dateStr) => {
            const [day, month, year] = dateStr.split('-').map(Number);
            return new Date(year, month - 1, day);
        };
        if (halfDayDate) {
            halfDayDate = convertDateFormat(halfDayDate);
        }
        if (startDate && endDate) {
            startDate = convertDateFormat(startDate);
            endDate = convertDateFormat(endDate);
            duration = Math.abs(parseDate(endDate) - parseDate(startDate)) / (1000 * 60 * 60 * 24);
        }
        const newLeave = new LeaveApplication({
            startDate,
            endDate,
            halfDayDate,
            type,
            reason,
            duration,
            employee
        })
        await newLeave.save();
        res.json({
            success: true,
            newLeave
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getHrAppointments = async (req, res) => {
    try {
        const { branch, shift } = req.params;
        const date = updateDate();

        const result = await Appointment.aggregate([
            {
                $match: {
                    date,
                    complete_appointment_flag: true,
                    medicine_issued_flag: false,
                    branch: branch,
                    appointmentType: { $in: ['general', 'repeat', 'courier'] },
                    shift
                }
            },
            {
                $group: {
                    _id: {
                        branch: "$branch",
                        appointmentType: "$appointmentType",
                        shift
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const counts = {
            generalAppointments: 0,
            repeatAppointments: 0,
            courierAppointments: 0,
        };

        result.forEach(({ _id, count }) => {
            const key = `${_id.appointmentType}Appointments`;
            counts[key] = count;
        });

        res.json({
            success: true,
            ...counts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

export const getAppDetails = async (req, res) => {
    try {
        const { branch, appointmentType, shift } = req.params;
        const date = updateDate();
        const appointments = await Appointment.find({ branch, date, shift, complete_appointment_flag: true, appointmentType }).populate('Doctor').populate('PatientCase');

        res.json({
            success: true,
            appointments
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
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
        const { itemName, unit, quantity, branch } = req.body;
        const itemexists = await Item.findOne({ itemName });
        const unitexists = await Unit.findOne({ unit });

        if (!itemexists || !unitexists) {
            return res.json({ success: false, message: "Stock does not have these" });
        }
        const stockExists = await ItemStock.findOne({
            itemName
        });
        if (stockExists) {
            return res
                .status(200)
                .json({
                    success: false,
                    message: "Item already added"
                });
        }

        const newStock = new ItemStock({
            itemName,
            unit,
            quantity,
            branch: branch,
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
        const { branch } = req.params;
        const itemStock = await ItemStock.find({ branch });
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
        if (req.body.approval_flag_receive !== undefined) {
            updateData.approval_flag_receive = req.body.approval_flag_receive;
        }
        if (req.body.is_order_placed !== undefined) {
            updateData.is_order_placed = req.body.is_order_placed;
        }

        if (req.body.reorder_level !== undefined) {
            updateData.reorder_level = req.body.reorder_level;
        }
        if (req.body.last_updated !== undefined) {
            updateData.last_updated = req.body.last_updated;
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

export const addOrderId = async (req, res) => {
    try {

        const { orderID, itemID, item } = req.body;
        await OrderId.create({ order: orderID, itemId: itemID, item: item });
        res.json({
            message: "OrderId added",
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getOrderId = async (req, res) => {
    try {
        const order = await OrderId.find();
        res.json({
            order
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const addOrderBillNumber = async (req, res) => {
    try {
        const { id } = req.params;
        const { billNumber } = req.body;
        const order = await Order.findByIdAndUpdate(id, {
            billNumber
        });
        return res.json({
            success: true,
            message: "Bill Number Added"
        });
    } catch (error) {
        return res.json({
            success: false,
            message:error.message
        })
    }
}

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

        res.status(201).json({
            message: "Order placed successfully",
            newOrder
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const sendOrderEmail = async (req, res) => {
  try {
    const groupedOrders = {}; 
    const date = updateDate();
    const { branch } = req.params;
    await Promise.all(
      req.body.map(async (item) => {
        if (!item.vendor[0] || !branch) return;
          const vendorEmail = await ItemVendor.findOne({ vendorname: item.vendor[0] });
        const itemUnit = await ItemStock.findById(item.itemId);
        const formattedItem = {
          item: item.itemName,
          quantity: `${item.quantity} ${itemUnit?.unit}`,
          orderDate: date,
        };

          const key = `${vendorEmail?.email}__${branch}`;

        if (!groupedOrders[key]) {
          groupedOrders[key] = {
            vendor: vendorEmail?.email,
            branch: branch,
            orders: [],
          };
        }

        groupedOrders[key].orders.push(formattedItem);
      })
    );

    const vendorOrderList = Object.values(groupedOrders);

    await sendVendorOrderEmail(vendorOrderList);

    return res.json({
      success: true,
      payload: vendorOrderList,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const get_Item_Order = async (req, res) => {
    try {
        const { id } = req.params;

        const orders = await Order.find().populate('formRows.itemId');

        const branchOrders = orders.filter((order) => order?.formRows?.some(row => row?.itemId?.branch?.toString() === id));
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

export const receiveOrderHelper = async (itemId, orderId, data) => {
    try {
        const { receivedQuantity, order_Delivered_Flag, doctor_Approval_Flag, received_date } = data;

        const order = await Order.findById(orderId);

        const item = order?.formRows.filter((order) => order?._id.toString() === itemId);

        if (receivedQuantity != undefined) {
            item[0].receivedQuantity = receivedQuantity;
            const itemExist = await ItemStock.findByIdAndUpdate(
                item[0]?.itemId,
                {
                    $inc: { quantity: parseInt(receivedQuantity) },
                    $set: { approval_flag_receive: true, docApproval_flag: false, receive_quantity: parseInt(receivedQuantity) }
                },
                { new: true }
            )
        }
        if (order_Delivered_Flag != undefined) {
            item[0].order_Delivered_Flag = order_Delivered_Flag;
        }
        if (doctor_Approval_Flag != undefined) {
            item[0].doctor_Approval_Flag = doctor_Approval_Flag
        }
        if (received_date != undefined) {
            item[0].received_date = received_date
        }
        await order.save();

        const orderIdDelete = await OrderId.findOneAndDelete({ order: orderId });
        return item[0];
    } catch (error) {
        console.log(error.message);
    }
}

export const updateReceivedOrder = async (req, res) => {
    try {
        const { itemId, orderId } = req.params;

        const item = await receiveOrderHelper(itemId, orderId, req.body);

        res.json({
            items: item
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
        const medOrder = await medicalOrder.findById(orderId);
        if (order) {
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            order.Bill.push({ imageUrl: base64Image });
            await order.save();
        }
        if (medOrder) {
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            medOrder.Bill.push({ imageUrl: base64Image });
            await medOrder.save();
        }


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
        const medOrder = await medicalOrder.findById(orderId);
        let Images;
        if (order) {
            Images = order.Bill;
        }
        if (medOrder) {
            Images = medOrder.Bill;
        }

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
        const medOrder = await medicalOrder.findById(orderId);
        if (order) {
            order.Bill = order.Bill.filter((bill) => bill._id.toString() !== id)
            await order.save();
        }
        if (medOrder) {
            medOrder.Bill = medOrder.Bill.filter((bill) => bill._id.toString() !== id)
            await medOrder.save();
        }

        res.json({
            message: "Deleted Successfully",
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
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
        const { medicineName, potency, quantity, branch } = req.body;
        const itemexists = await Medicine.findOne({ medicine: medicineName });
        const unitexists = await Potency.findOne({ potency });
        const stockExists = await MedicalStock.findOne({ medicineName: medicineName, potency: potency });
        if (stockExists) {
            return res.json({ success: false, message: "Stock already exists" });
        }
        if (!itemexists || !unitexists) {
            return res.json({ success: false, message: "Stock does not have these" });
        } 
        const newStock = new MedicalStock({
            medicineName,
            potency,
            quantity,
            branch: branch,
            receive_quantity: quantity,
        })
        await newStock.save();
        res.json({
            success: true,
            newStock
        })
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const updateMedicalStock = async (req, res) => {
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
        if (req.body.is_order_placed !== undefined) {
            updateData.is_order_placed = req.body.is_order_placed;
        }
        if (req.body.approval_flag_receive !== undefined) {
            updateData.approval_flag_receive = req.body.approval_flag_receive;
        }
        if (req.body.approval_flag_new !== undefined) {
            updateData.approval_flag_new = req.body.approval_flag_new;
        }
        if (req.body.reorder_level !== undefined) {
            updateData.reorder_level = req.body.reorder_level;
        }
        if (req.body.last_updated !== undefined) {
            updateData.last_updated = req.body.last_updated;
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

        const updatedItem = await MedicalStock.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        res.json({ success: true, updatedItem });

    } catch (error) {
        console.error("Error updating item stock:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const get_medical_stock = async (req, res) => {
    try {
        const { branch } = req.params;
        const medicalStock = await MedicalStock.find({ branch });
        res.json({
            medicalStock,
            success: true
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
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

        const newOrder = new medicalOrder({ formRows, orderDate: formattedDate });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", newOrder });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

export const sendMedicalOrderEmail = async (req, res) => {
  try {
    const groupedOrders = {}; 
    const date = updateDate();
    const { branch } = req.params;
    await Promise.all(
      req.body.map(async (medicine) => {
        if (!medicine.vendor[0] || !branch) return;
          const vendorEmail = await MedicalVendor.findOne({ vendorname: medicine.vendor[0] });
        const medicineUnit = await MedicalStock.findById(medicine.medicineId);
        const formattedItem = {
          medicine: medicine.medicineName,
          quantity: medicine.quantity,
          potency: medicine.potency,
          orderDate: date,
        };

          const key = `${vendorEmail?.email}__${branch}`;

        if (!groupedOrders[key]) {
          groupedOrders[key] = {
            vendor: vendorEmail?.email,
            branch: branch,
            orders: [],
          };
        }

        groupedOrders[key].orders.push(formattedItem);
      })
    );

    const vendorOrderList = Object.values(groupedOrders);

    await sendMedicalVendorOrderEmail(vendorOrderList);

    return res.json({
      success: true,
      payload: vendorOrderList,
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const get_Medical_Order = async (req, res) => {
    try {
        const { id } = req.params;

        const orders = await medicalOrder.find().populate('formRows.medicineId');

        const branchOrders = orders.filter((order) => order?.formRows?.some(row => row?.medicineId?.branch?.toString() === id));
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

export const addMedicalOrderId = async (req, res) => {
    try {
        const { orderID, medicineID, medicine } = req.body;
        await MedicalOrderId.create({ order: orderID, medicineId: medicineID, medicine: medicine });
        res.json({
            message: "MedcialOrderId added",
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getMedicalOrderId = async (req, res) => {
    try {
        const medicalOrder = await MedicalOrderId.find();
        res.json({
            medicalOrder
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const updateMedicalReceivedOrder = async (req, res) => {
    try {
        const { medicineId, orderId } = req.params;
        const { receivedQuantity, order_Delivered_Flag, doctor_Approval_Flag, received_date } = req.body;

        const order = await medicalOrder.findById(orderId);

        const medicine = order?.formRows.filter((order) => order?._id.toString() === medicineId);

        if (receivedQuantity != undefined) {
            medicine[0].receivedQuantity = receivedQuantity;
            await MedicalStock.findByIdAndUpdate(medicine[0]?.medicineId,
                {
                    $inc: { quantity: parseInt(receivedQuantity) },
                    $set: { approval_flag_receive: true, docApproval_flag: false, receive_quantity: parseInt(receivedQuantity) }
                },
                { new: true }
            )
        }
        if (order_Delivered_Flag != undefined) {
            medicine[0].order_Delivered_Flag = order_Delivered_Flag;
        }
        if (doctor_Approval_Flag != undefined) {
            medicine[0].doctor_Approval_Flag = doctor_Approval_Flag
        }
        if (received_date != undefined) {
            medicine[0].received_date = received_date
        }
        await order.save();
        const medicalOrderIdDelete = await MedicalOrderId.findOneAndDelete({ order: orderId });

        res.json({
            medicines: medicine[0]
        });
    } catch (error) {
        res.json({
            message: error.message,
            succes: false
        })
    }
}

export const addMedicalOrderBillNumber = async (req, res) => {
    try {
        const { id } = req.params;
        const { billNumber } = req.body;
        const order = await medicalOrder.findByIdAndUpdate(id, {
            billNumber
        });
        return res.json({
            success: true,
            message: "Bill Number Added"
        });
    } catch (error) {
        return res.json({
            success: false,
            message:error.message
        })
    }
}

//collections
export const getCollection = async (req, res) => {
    try {
        const { branch, shift } = req.params;

        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            return formattedDate;
        };
        const todayDate = updateDate();
        const collection = await billPayment.find({shift}).populate('patient').populate('paymentCollectedBy');
        const branchCollection = collection.filter((item) => item?.patient?.branch === branch);
        const patientsCollection = collection.filter((item) => item?.patient?.branch === branch && item?.date === todayDate);

        res.json({
            patientsCollection,
            branchCollection,
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

export const getAllCollection = async (req, res) => {
    try {
        const { branch } = req.params;

        const collection = await billPayment.find().populate('patient').populate('paymentCollectedBy');
        const branchCollection = collection.filter((item) => item?.patient?.branch === branch);

        res.json({
            branchCollection
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false
        })
    }
}

//courier Payment

export const addCourierPayment = async (req, res) => {
    try {
        const { totalBill, billPaid, transactionDetails, paymentCollectedBy, address, email, courier_Received_Payment } = req.body;
        const { id } = req.params;
        const findBillDetails = await billPayment.findOne({ patient: id });
        let formattedDate = '';
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            formattedDate = `${day}-${month}-${year}`;
        };
        updateDate();

        const balance = findBillDetails?.dueBalance;
        if (courier_Received_Payment === true) {
            const payment = await courierPayment.updateOne(
            { patient: id },
            {
                $set: {
                    dueBalance: balance,
                    date: formattedDate,
                    transactionDetails,
                    billPaid,
                    totalBill,
                    paymentCollectedBy,
                    address,
                    email,
                }
            },
            { upsert: true }
        );
        }
        else {
            const payment = await courierPayment.create({
            dueBalance: balance,
            date: formattedDate,
            totalBill,
            billPaid,
            transactionDetails,
            paymentCollectedBy,
            address,
            email,
            patient:id
        });
        }

        await sendCourierPatientEmail(req.body.email, req.body);
        res.json({
            success: true,
            message: "Add Courier Payment"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const getCourierPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const updateDate = () => {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            return formattedDate;
        };
        const todayDate = updateDate();
        const allCourier = await courierPayment.find().populate('patient').populate('paymentCollectedBy');
        const branchCourier = allCourier.filter((item) => item?.patient?.branch === id);
        const patientsCourier = allCourier.filter((item) => item?.patient?.branch === id && item?.date === todayDate);
        
        res.json({
            branchCourier,
            patientsCourier,
            success: true
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const deliveryPayment = async (req, res) => {
    try {
        const { id, patientId } = req.params;
        const { totalBill, billPaid, transactionDetails, paymentCollectedBy, address, email } = req.body;
        const payment = await courierPayment.findById(id);
        const findBillDetails = await billPayment.findOne({ patient: patientId });
        const balance = findBillDetails?.dueBalance;
        const formattedDate = updateDate();
        if (payment) {
            const updatePayment = await courierPayment.findByIdAndUpdate(id, {
                dueBalance: balance,
                date: formattedDate,
                transactionDetails,
                billPaid,
                totalBill,
                paymentCollectedBy,
                address,
                email
            })
        }

        return res.json({
            success: true,
            message:'Payment of courier done'
        })

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export const courierStatus = async (req, res) => {
    try {
        const { id, patientId } = req.params;
        const { balance_paid_flag, date } = req.body;

        const findBillDetails = await billPayment.findOne({ patient: patientId });
        const balance = findBillDetails?.dueBalance;
        const updated = { order_Received_flag: true, dueBalance: balance };
        if (balance_paid_flag !== undefined) {
            updated.balance_paid_flag = true;
            updated.receiveDate = date;
        }
        const courierOrder = await courierPayment.findByIdAndUpdate(id,
            { $set: updated }
        );

        res.json({
            success: true,
            message: "updated courier status"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}