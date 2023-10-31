import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // first we get the token
  const token = jwt.sign({ userId }, process.env.JWT_SECRETE, {
    expiresIn: "1d", // when the token to expire
  });

  // now we save it in a cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
