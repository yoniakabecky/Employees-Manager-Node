const express = require('express');
const router = express.Router();

let Employees = require('../models/employees.mongo');


router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});


router.get('/', (req, res) => {
  Employees.find()
    .then((employees) => res.json(employees))
    .catch(err => res.status(400).send(`Error on getting employees data :${err}`))
});


router.post('/', (req, res) => {
  const { name, email, address, phone } = req.body;

  const newEmployee = new Employees({
    name,
    email,
    address,
    phone
  });

  newEmployee.save()
    .then(() => res.json('Successfully added an employee'))
    .catch(err => res.status(400).json({ 'msg': `Could not save data :${err}` }));
});

router.put('/', (req, res) => {
  const { id, name, email, address, phone } = req.body;
  const queryId = { _id: id };

  const updatedEmployee = {
    name,
    email,
    address,
    phone
  }

  Employees.findOneAndUpdate(queryId, updatedEmployee)
    .then(() => res.json('Update success'))
    .catch(err => res.status(400).json({ 'msg': `Could not update an employee data :${err}` }));
})

router.delete('/', (req, res) => {
  const id = req.body.id;
  const queryId = { _id: id };

  Employees.findOneAndDelete(queryId)
    .then(() => res.json('Update success'))
    .catch(err => res.status(400).json({ 'msg': `Could not delete employees data :${err}` }));
})

module.exports = router;