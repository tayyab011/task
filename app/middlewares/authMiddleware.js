import { DecodeToken } from "../utility/tokenUtility.js";
import { userModel } from "../models/userModel.js";

export default async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Please log in.",
      });
    }

    let decoded = DecodeToken(token);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token. Please log in again.",
      });
    }


    const user = await userModel
      .findById(decoded._id)
      .select("fullName email role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }


    req.user = user;
    req.headers.email = user.email;
    req.headers.user_id = user._id;

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Auth middleware failed",
      error: error.toString(),
    });
  }
};
