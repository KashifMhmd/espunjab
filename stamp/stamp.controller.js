const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const Role = require("_helpers/role");
const stampService = require("./stamp.service");

// routes
// router.post("/addStamp", authorize(Role.Admin), createStampSchema, createStamp);
// router.get("/getStamps", authorize(Role.Admin), getAll);
// router.get("/:id", getById);
// router.put("/:id", authorize(Role.Admin), updateSchema, update);
// router.delete("/:id", authorize(Role.Admin), _delete);

router.post("/addStamp", createStampSchema, createStamp);
router.get("/getStamps", getAll);
router.get("/:id", getById);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

module.exports = router;

function getAll(req, res, next) {
  stampService
    .getAll()
    .then((stamps) => res.json(stamps))
    .catch(next);
}

function getById(req, res, next) {
  stampService
    .getById(req.params.id)
    .then((stamp) => (stamp ? res.json(stamp) : res.sendStatus(404)))
    .catch(next);
}

function createStampSchema(req, res, next) {
  const schema = Joi.object({
    stampId: Joi.string().required(),
    type: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    applicant: Joi.string().required(),
    fatherName: Joi.string().required(),
    agent: Joi.string().required(),
    address: Joi.string().required(),
    issueDate: Joi.string().required(),
    validityDate: Joi.string().required(),
    amountInWords: Joi.string().required(),
    reason: Joi.string().required(),
    vendorInformation: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function createStamp(req, res, next) {
  stampService
    .create(req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schemaRules = {
    stampId: Joi.string().required(),
    type: Joi.string().required(),
    amount: Joi.number().required(),
    description: Joi.string().required(),
    applicant: Joi.string().required(),
    fatherName: Joi.string().required(),
    agent: Joi.string().required(),
    address: Joi.string().required(),
    issueDate: Joi.date().required(),
    validityDate: Joi.date().required(),
    amountInWords: Joi.string().required(),
    reason: Joi.string().required(),
    vendorInformation: Joi.string().required(),
    // title: Joi.string().empty(""),
  };
  const schema = Joi.object(schemaRules);
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  stampService
    .update(req.params.id, req.body)
    .then((account) => res.json(account))
    .catch(next);
}

function _delete(req, res, next) {
  stampService
    .delete(req.params.id)
    .then(() => res.json({ message: "Stamp deleted successfully" }))
    .catch(next);
}
