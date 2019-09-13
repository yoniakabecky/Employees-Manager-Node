const express = require('express');
const router = express.Router();
const uuid = require('uuid/v1');
const employees = require('../models/employees');

router.get('/', (req, res) => {
  res.json(employees);
})

router.post('/', (req, res) => {
  const { name, email, address, phone } = req.body;

  const newEmployee = {
    id: uuid(),
    name: name,
    email: email,
    address: address,
    phone: phone
  };

  employees.push(newEmployee);
  res.json(employees);
})

router.put('/', (req, res) => {
  const { id, name, email, address, phone } = req.body;
  const index = employees.findIndex(employee => employee.id == id);

  employees[index] = {
    id,
    name,
    email,
    address,
    phone
  }
  console.log(employees);
  res.json(employees);
})

router.delete('/', (req, res) => {
  const id = req.body.id;
  const index = employees.findIndex(employee => employee.id == id);

  employees.splice(index, 1);
  res.json(employees);
})

module.exports = router;