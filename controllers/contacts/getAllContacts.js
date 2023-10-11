const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite, name, phone } = req.query;
  const skip = (page - 1) * limit;
  const queryBody = {
    owner,
  };

  if (favorite) {
    queryBody.favorite = favorite;
  }

  if (name) {
    queryBody.name = name;
  }

  if (phone) {
    queryBody.phone = phone;
  }

  const contacts = await Contact.find(queryBody, "", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json({
    status: "success",
    code: 200,
    data: contacts,
  });
};

module.exports = getAllContacts;
