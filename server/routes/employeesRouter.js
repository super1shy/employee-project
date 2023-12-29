const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');
const { auth } = require('../middleware/auth');

router.get('/', auth, employeesController.all);
router.get('/:id', auth, employeesController.employee);
router.post('/', auth, employeesController.add);
router.delete('/:id', auth, employeesController.remove);
router.put('/:id', auth, employeesController.edit);

module.exports = router;
