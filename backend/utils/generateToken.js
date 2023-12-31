import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // first we get the token
  if (userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRETE, {
      expiresIn: "5d", // when the token to expire
    });

    // now we save it in a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", //Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 5 * 24 * 60 * 60 * 1000, // 5day
    });
  } else {
    res.status(402).json({ message: "No user Id found" });
    res.redirect("/auth");
  }
};

export default generateToken;
