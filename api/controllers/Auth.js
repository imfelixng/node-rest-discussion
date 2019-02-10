const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Account = require('../models/Account');
const User = require('../models/User');

const validateRegisterInput = require('../validations/register');
const validateLoginInput = require('../validations/login');

exports.register = async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(
      errors,
    );
  }

  let checkUser = null;
  try {
    checkUser = await Account.findOne({ email: req.body.email });
  } catch (error) {
    errors.error = error.message;
    return res.status(500).json(errors);
  }

  if (checkUser) {
    errors.email = 'Email already exists';
    return res.status(400).json(errors);
  }

  let hashedPassword = null;
  try {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    console.log(error);
  }

  if (!hashedPassword) {
    errors.error = 'Don\'t create account.';
    return res.status(500).json(errors);
  }

  const newAccount = new Account({
    email: req.body.email,
    password: hashedPassword,
    role: 3,
  });

  const newUser = new User({
    email: req.body.email,
    fullname: req.body.fullname,
  });

  let userCreated = null;
  try {
    userCreated = await Promise.all([newAccount.save(), newUser.save()]);
  } catch (error) {
    console.log(error);
    errors.error = errors.message;
    return res.status(500).json(errors);
  }

  if (!userCreated) {
    errors.error = 'Account don\'t create successfuly';
    return res.status(500).json(errors);
  }

  return res.status(200).json(userCreated[1]);
};

// eslint-disable-next-line consistent-return
exports.login = async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = null;
  try {
    user = await Account.findOne({ email: req.body.email });
  } catch (error) {
    errors.error = error.message;
    res.status(400).json(errors);
  }

  if (!user) {
    errors.auth = 'Email or password is invalid';
    return res.status(400).json(errors);
  }

  let isMatch = null;
  try {
    isMatch = await bcrypt.compare(req.body.password, user.password);
  } catch (error) {
    errors.auth = 'Email or password is invalid';
    return res.status(400).json(errors);
  }

  if (!isMatch) {
    errors.auth = 'Email or password is invalid';
    return res.status(400).json(errors);
  }

  const jwtPayload = {
    id: user.id,
    email: req.body.email,
    fullname: user.fullname,
  };

  jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '1d' }, (err, token) => {
    if (err) {
      errors.error = 'Error! An error occurred. Please try again later.';
      return res.status(500).json(errors);
    }
    return res.status(200).json({
      token: `Bearer ${token}`,
    });
  });
};
