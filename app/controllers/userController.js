import bcrypt from "bcryptjs";
import { userModel } from "../models/userModel.js";
import { EncodeToken } from "./../utility/tokenUtility.js";

export const register = async (req, res) => {
  try {
    const { email, fullName, mobile, password, role } = req.body;

    const existingData = await userModel.findOne({ email });
    if (existingData) {
      return res.status(400).json({
        success: false,
        message: "User Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await userModel.create({
      email,
      fullName,
      mobile,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      success: true,
      message: "User Register Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "something went wrong",
      error: error.toString(),
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill all the data",
        success: false,
      });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email. Please register first",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Incorrect role",
        success: false,
      });
    }

  
    const token = EncodeToken({ email: user.email, _id: user._id });

    const cookiOption = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/",
    };
    res.cookie("token", token, cookiOption);

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
    };

    res.status(200).json({
      token,
      success: true,
      user,
      message: "User Login Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "something went wrong",
      error: error.toString(),
    });
  }
};
