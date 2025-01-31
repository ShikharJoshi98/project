import jwt from 'jsonwebtoken';

const loginHR = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(process.env.HR_USER, process.env.HR_PASSWORD);
        if (username === process.env.HR_USER && password === process.env.HR_PASSWORD) {
            const token = jwt.sign(username + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({
                success:false,message:"Invalid Credentials"
            })
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export {loginHR}