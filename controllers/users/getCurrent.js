const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    Status: 200,
    email,
    subscription,
  });
};

module.exports = getCurrent;
