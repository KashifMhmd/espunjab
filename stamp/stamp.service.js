const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const stamp = await db.Stamp.find();
  const stampWithQr = stamp.map((st) => ({
    ...st.toObject(),
    qrCode: "http://localhost:4000/stamp/" + st._id,
  }));
  return stampWithQr.map((x) => basicDetails(x));
}

async function getById(id) {
  const stamp = await getstamp(id);
  return basicDetails(stamp);
}

async function create(params) {
  // validate
  if (await db.Stamp.findOne({ stampId: params.stampId })) {
    throw 'Stamp "' + params.stampId + '" is already registered';
  }

  const stamp = new db.Stamp(params);

  // save stamp
  await stamp.save();

  return basicDetails(stamp);
}

async function update(id, params) {
  const stamp = await getstamp(id);

  // copy params to account and save
  Object.assign(stamp, params);
  stamp.updated = Date.now();
  await stamp.save();

  return basicDetails(stamp);
}

async function _delete(id) {
  const stamp = await getstamp(id);
  await stamp.remove();
}

// helper functions

async function getstamp(id) {
  if (!db.isValidId(id)) throw "Stamp not found";
  let stamp = await db.Stamp.findById(id);
  if (!stamp) throw "Stamp not found";
  const qrCodeLink = "http://localhost:4000/stamp/" + stamp.id;
  stamp.qrCode = qrCodeLink;
  return stamp;
}

function basicDetails(stamp) {
  const {
    _id,
    stampId,
    type,
    amount,
    description,
    applicant,
    fatherName,
    agent,
    address,
    issueDate,
    validityDate,
    amountInWords,
    reason,
    vendorInformation,
    created,
    updated,
    qrCode,
  } = stamp;
  return {
    _id,
    stampId,
    type,
    amount,
    description,
    applicant,
    fatherName,
    agent,
    address,
    issueDate,
    validityDate,
    amountInWords,
    reason,
    vendorInformation,
    created,
    updated,
    qrCode,
  };
}
