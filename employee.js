const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

//delete employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const index = employee.findIndex(emp => emp.id === employeeId);

    if (index !== -1) {
      employee.splice(index, 1);
      res.status(200).json({ message: 'Record Deleted' });
    } else {
      res.status(404).json({ error: "Record Doesn't exist ", id: employeeId });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};


// Create a new employee
exports.createEmployee = async (req, res, next) => {
  try {
    const { id, name } = req.body;

    // Check if both ID and name are provided
    if (id && name) {
      // Check if the employee with the given ID already exists
      const existingEmployee = employee.find(emp => emp.id === id);

      if (existingEmployee) {
        res.status(400).json({ error: 'This Record exists' });
      } else {
        // Add the new employee to the array
        employee.push({ id, name });
        res.status(201).json({ message: 'Record added' });
      }
    } else {
      res.status(400).json({ error: 'ID and name are required' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error' });
  }
};


