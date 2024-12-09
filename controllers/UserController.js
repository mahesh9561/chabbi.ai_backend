const bcrypt = require('bcrypt');
const userSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_jwt_secret_key";

exports.registerUser = async (req, res) => {
    const { name, email, mobile, pass, role } = req.body;
    
    const hashedPassword = bcrypt.hashSync(pass, 10);

    const userEmail = await userSchema.findOne({ email });
    if (userEmail) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const userData = new userSchema({
        name,
        email,
        mobile,
        pass: hashedPassword,
        role: role || 'user'  // If no role is provided, default to 'user'
    });

    try {
        await userData.save();
        const token = jwt.sign({ userId: userData._id, userEmail: userData.email, userName: userData.name, role: userData.role }, JWT_SECRET, { expiresIn: '1hr' });
        return res.status(200).json({ message: "Registration successful", token });
    } catch (error) {
        return res.status(400).json({ message: "Registration failed" });
    }
};


exports.loginUser = (async (req, res) => {
    const { email, pass } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
        return res.status(500).json({ message: "Invalid Email or Password" });
    }
    const isValidPassword = await bcrypt.compare(pass, user.pass);
    if (!isValidPassword) {
        return res.status(500).json({ message: "Invalid Password" });
    }
    try {
        const token = jwt.sign(
            { userId: user._id, userEmail: user.email, username: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: '1hr' }
        );
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(200).json({ message: "Login Unsuccessful" });
    }
});
