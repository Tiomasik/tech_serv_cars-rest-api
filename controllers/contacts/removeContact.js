const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndRemove({ contactId, owner });

  if (!result) {
    throw new NotFound(`Contact width id=${contactId} is not found`);
  }

  res.json({
    status: "success",
    code: 200,
    message: `Contact width id=${contactId} was deleted`,
    data: result,
  });
};

module.exports = deleteContact;
