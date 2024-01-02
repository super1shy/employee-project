require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/usersRouter');
const employeesRouter = require('./routes/employeesRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/employees', employeesRouter);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
