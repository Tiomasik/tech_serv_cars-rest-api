const { User } = require("../../models/user");

const updateSubscriptionUser = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json({
    Status: 200,
    email: result.email,
    subscription: result.subscription,
  });
};

module.exports = updateSubscriptionUser;
