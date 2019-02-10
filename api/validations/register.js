const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = (data) => {
  const errors = {};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (validator.isEmpty(data.fullname)) {
    errors.fullname = 'Fulname field is required';
  }

  if (!validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be over 6 characters';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = 'Password must match';
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
