const express = require("express");
const router = express.Router();

const { ctrlContacts } = require("../../controllers");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { ctrlUsers } = require("../../controllers");
const { schema } = require("../../models/contact");

router.get(
  "/",
  ctrlUsers.authenticate,
  ctrlWrapper(ctrlContacts.getAllContacts)
);

router.get(
  "/:contactId",
  ctrlUsers.authenticate,
  isValidId,
  ctrlWrapper(ctrlContacts.getContactById)
);

router.post(
  "/",
  ctrlUsers.authenticate,
  validation(schema.postSchema),
  ctrlWrapper(ctrlContacts.addContact)
);

router.put(
  "/:contactId",
  ctrlUsers.authenticate,
  isValidId,
  validation(schema.putSchema),
  ctrlWrapper(ctrlContacts.updateContact)
);

router.patch(
  "/:contactId/favorite",
  ctrlUsers.authenticate,
  isValidId,
  validation(schema.patchFavoriteSchema),
  ctrlWrapper(ctrlContacts.updateStatusContact)
);

router.delete(
  "/:contactId",
  ctrlUsers.authenticate,
  isValidId,
  ctrlWrapper(ctrlContacts.removeContact)
);

module.exports = router;
