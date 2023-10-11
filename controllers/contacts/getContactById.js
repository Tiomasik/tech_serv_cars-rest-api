const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({ contactId, owner });

  if (result.length === 0) {
    throw new NotFound(`Contact width id=${contactId} is not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = getContactById;
