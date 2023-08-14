const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;
// Get the default connection

const db = mongoose.connection;
// Listen for the connection event
db.on('connected', () => {
  console.log('Connected to MongoDB');
});
// Listen for the error event
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = {
    Account: require('accounts/account.model'),
    Stamp: require('stamp/stamp.model'),
    isValidId
};



function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}