const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findByPk(decoded.id);

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  auth,
};
