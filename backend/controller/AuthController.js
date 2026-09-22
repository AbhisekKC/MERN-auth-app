import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
//signup and hasing the password with bcrypt
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists, you can login!' })
        }
        const userModel = new User({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(200).json({ message: 'signup succesfull', success: true })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'internal server error', success: false })
    }


}

// login 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMsg = ' Authentication failed, email or password wrong!!';
        if (!user) {
            return res.status(400).json({ message: errorMsg, success: false })
        }

        const isPass = await bcrypt.compare(password, user.password);
        if (!isPass) {
            return res.status(400).json({ message: errorMsg, success: false })
        }

        const jwToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' })


        res.status(200).json({
            message: 'Login succesfully',
            success: true ,
            jwToken,
            email,
            name: user.name
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'internal server error', success: false })
    }


}






