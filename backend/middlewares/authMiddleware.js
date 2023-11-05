import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res) => {
  let token;
  token = req.cookies.jwt

  if (token) {
    try {
      //use respond from the generated token to verify the use
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.json({ status: false });
      } else {
        req.user = user;
        res.json({
          status: true,
          provedUser: {
            user,
            token: token,
          },
        });
      }
    } catch (e) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
