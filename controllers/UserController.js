const bcrypt = require('bcrypt');
const userSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key";

exports.registerUser = (async (req, res) => {
    const { name, email, mobile, pass } = req.body;
    const hashedPassword = bcrypt.hashSync(pass, 10);
    const userEmail = await userSchema.findOne({ email });
    if (userEmail) {
        return res.status(400).json({ message: "Email already Exist" });
    }
    const userData = new userSchema({
        name,
        email,
        mobile,
        pass: hashedPassword
    });
    try {
        await userData.save();
        const token = jwt.sign({ userId: userData._id, userEmail: userData.email, userName: userData.name }, JWT_SECRET, { expiresIn: '1hr' })
        return res.status(200).json({ message: "Register successfull", token })
    } catch (error) {
        return res.status(400).json({ message: "Register Failed" });
    }
})

exports.loginUser = (async (req, res) => {
    const { email, pass } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
        console.log(user)
        return res.status(500).json({ message: "Invalid Email or Password" });
    }
    const isValidPassword = await bcrypt.compare(pass, user.pass);
    if (!isValidPassword) {
        return res.status(500).json({ message: "Invalid Password" });
    }
    try {
        const token = jwt.sign({ userId: user._id, userEmail: user.email, username: user.name }, JWT_SECRET, { expiresIn: '1hr' })
        console.log(token)
        return res.status(200).json({ message: "Login successfull", token })
    } catch (error) {
        return res.status(200).json({ message: "Login Unsuccessfull" })
    }
}
)