const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate(
    { contactId, owner },
    req.body,
    {
      new: true,
    }
  );

  if (!result) {
    throw new NotFound(`Contact width id=${contactId} is not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = updateContact;
