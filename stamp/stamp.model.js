const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    stampId: { type: String, unique: true, required: true },
    type: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    applicant: { type: String, required: true },
    fatherName: { type: String, required: true },    
    agent: { type: String, required: true },
    address: { type: String, required: true },
    issueDate: { type: String, required: true },
    validityDate: { type: String, required: true },
    amountInWords: { type: String, required: true },
    reason: { type: String, required: true },
    
    vendorInformation: { type: String, required: true },
    
    created: { type: Date, default: Date.now },
    updated: Date,
});



module.exports = mongoose.model('Stamp', schema);