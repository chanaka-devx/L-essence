const validateUsername = (req, res, next) => {
  const { username } = req.body;

  // Simple regex for email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Simple Sri Lankan mobile number check (e.g. 0711234567 or +94711234567)
  const phoneRegex = /^(?:\+94|0)?7\d{8}$/;

  if (!username || (!emailRegex.test(username) && !phoneRegex.test(username))) {
    return res.status(400).json({
      error: "Username must be a valid email or mobile number",
    });
  }

  next(); // Proceed to controller
};

module.exports = validateUsername;
