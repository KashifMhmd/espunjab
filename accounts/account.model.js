const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  isVerified: String,
  verified: Date,
  passwordReset: Date,
  created: { type: Date, default: Date.now },
  updated: Date,
});

module.exports = mongoose.model("Account", schema);
