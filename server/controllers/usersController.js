const { User } = require('../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/users/login
 * @access Public
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Please, fill all required fields!' });
  }

  const user = await User.findOne({ where: { email } });
  const isPasswordCorrect =
    user && (await bcrypt.compare(password, user.password));

  if (user && isPasswordCorrect) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: '24h',
      }),
    });
  } else {
    return res.status(400).json({ message: 'Invalid password or email' });
  }
};

/**
 * @route POST /api/users/register
 * @access Public
 */
const register = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: 'Please, fill all required fields!' });
  }

  const [user, created] = await User.findOrCreate({
    where: { email, password: await bcrypt.hash(password, 10), name },
  });

  if (user) {
    return res
      .status(400)
      .json({ message: 'User with this email already exists' });
  }

  if (created && process.env.JWT_KEY) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, process.env.JWT_KEY, {
        expiresIn: '24h',
      }),
    });
  } else {
    return res
      .status(400)
      .json({ message: 'Sorry, please try again a bit later' });
  }
};

/**
 *
 * @route GET /api/user/current
 * @desc Current User
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { login, register, current };
