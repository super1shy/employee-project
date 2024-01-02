const { Employee } = require('../db/models');

/**
 * @route GET /api/employees
 * @desc get all employees
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await Employee.findAll();

    res.status(200).json(employees);
  } catch {
    res.status(500).json({ message: 'Sorry, an error happened' });
  }
};

/**
 * @route POST /api/employees/add
 * @desc adding an employee
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    data.userId = req.user.id;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res
        .status(400)
        .json({ message: 'Please, fill all required fields!' });
    }

    const employee = await Employee.create(data);

    return res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Sorry, an error happened' });
  }
};

/**
 * @route POST /api/empoyees/remove/:id
 * @desc delete an employee
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await Employee.destroy({ where: { id } });

    res.status(204).json('OK');
  } catch {
    res.status(500).json({ message: 'Sorry, an error happened' });
  }
};

/**
 * @route PUT /api/empoyees/edit/:id
 * @desc update an employee
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await Employee.update(data, { where: { id } });

    res.status(204).json('OK');
  } catch (err) {
    res.status(500).json({ message: 'Sorry, an error happened' });
  }
};

/**
 * @route GET /api/employees/:id
 * @desc get an employee
 * @access Private
 */
const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByPk(id);

    res.status(200).json(employee);
  } catch {
    res.status(500).json({ message: 'Sorry, an error happened' });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  employee,
};
