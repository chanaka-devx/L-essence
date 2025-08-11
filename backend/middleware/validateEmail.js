const validateEmail = (req, res, next) => {
  const { email } = req.body;

  // Simple regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      error: "Email must be a valid email address",
    });
  }

  next(); // Proceed to controller
};

module.exports = validateEmail;

