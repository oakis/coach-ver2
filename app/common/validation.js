import validator from 'validator';

export function createValidator(key, type) {
  const saveValues = value => {
    const v = {
      value,
      error: validateInput(value,type)
    };
    const state = {
      ...state
    };
    state[key] = v;
    this.setState(state);
  };
  this.validators[key] = () => {
    var v = this.state[key];
    return !v.error;
  };
  return saveValues;
}

export function checkValidation() {
  var valid = true;
  for (let key in this.validators) {
    if ( (typeof this.validators[key] === 'boolean' && !this.validators[key]) || (typeof this.validators[key] === 'function' && !this.validators[key]()) ) {
      valid = false;
      return;
    }
  }
  return valid;
}

function validateInput(value, type) {
  switch (type) {
    case 'password':
      return validatePassword(value);
    case 'username':
      return validateUsername(value);
    case 'email':
      return validateEmail(value);
    case 'number':
      return validateNumber(value);
    case 'numberOptional':
      return validateNumberOptional(value);
    case 'date':
      return validateDate(value);
    case 'string':
      return validateString(value);
    default:
      return validateString(value);
  }
}

function validatePassword(value) {
  if (!validator.isLength(value,{min:8,max:20})) {
    return 'Måste bestå av minst åtta tecken';
  } else if (/[`~<>;:"/[\]|{}()=+*]/.test(value)) {
    return 'Du har använt ett otillåtet tecken';
  } else {
    return false;
  }
}

function validateUsername(value) {
  if (validator.isEmpty(value)) {
    return 'Fältet får inte vara tomt.';
  } else if (/[`~<>;:"/[\]|{}()=+*]/.test(value)) {
    return 'Du har använt ett otillåtet tecken';
  } else {
    return false;
  }
}

function validateEmail(value) {
  if (!validator.isEmail(value)) {
    return 'Fyll i en giltig emailadress';
  } else {
    return false;
  }
}

function validateNumber(value) {
  if (!validator.isNumeric(value) && !validator.isEmpty(value)) {
    return 'Får bara innehålla siffror';
  } else if (validator.isEmpty(value)) {
    return 'Fältet får inte vara tomt';
  } else {
    return false;
  }
}

function validateNumberOptional(value) {
  if (!validator.isNumeric(value) && !validator.isEmpty(value)) {
    return 'Får bara innehålla siffror';
  } else {
    return false;
  }
}

function validateString(value) {
  if (validator.isEmpty(value)) {
    return 'Fältet får inte vara tomt';
  } else if (/[`~<>;:"/[\]|{}()=+*]/.test(value)) {
    return 'Du har använt ett otillåtet tecken';
  } else {
    return false;
  }
}

function validateDate(value) {
  return false;
}
