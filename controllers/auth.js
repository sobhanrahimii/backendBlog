import { ErrorHandle } from "../Error.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// Register
export const Register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10); // تولید نمک با 10 دوره هش‌سازی
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      phone: req.body.phone,
    });
    const addUser = await newUser.save();
    res.status(200).json(addUser);
  } catch (error) {
    next(error);
  }
};

// LOGIN
export const Login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(ErrorHandle(404, "user is not found!"));

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword)
      return next(ErrorHandle(404, "Wrong Password or Username"));

    const { isAdmin, password, __v, ...otherDetails } = user._doc;

    res.status(200).json({ details: { ...otherDetails } });
  } catch (error) {
    next(error);
  }
};
