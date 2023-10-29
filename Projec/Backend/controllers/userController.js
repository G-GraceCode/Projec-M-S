// @des Auth user/set token
// route POST /app
// @access public

const authUser = (req, res) => {
  res.status(200).json({
    Message: "authUser here Us",
  });
};

export { authUser };
