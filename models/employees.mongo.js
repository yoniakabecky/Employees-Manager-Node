const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useFindAndModify', false);

const employeesSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
}, {
  timestamps: true, writeConcern: { w: "majority", wtimeout: 5000 }
})

const Employees = mongoose.model('Employees', employeesSchema);
module.exports = Employees;