import validator from "validator";

export const validateVendor = (formData) => {
  const { name, phone, password } = formData;

  var errors = {};
  if (validator.isEmpty(name)) {
    errors = { ...errors, name: "The name is required." };
  } else {
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      errors = {
        ...errors,
        name: "The name must be 3 to 20 characters long.",
      };
    }
  }
  if (validator.isEmpty(phone)) {
    errors = { ...errors, phone: "The phone number is required." };
  } else {
    if (!validator.isLength(phone, { min: 10, max: 10 })) {
      errors = { ...errors, phone: "This is not a valid phone number." };
    }
  }
  if (validator.isEmpty(password)) {
    errors = { ...errors, password: "The password is required." };
  } else {
    if (!validator.isLength(password, { min: 8 })) {
      errors = {
        ...errors,
        password: "The password must be atleast 8 characters long.",
      };
    }
  }

  return errors;
};

export const validateShop = (formData) => {
  const { shopName, shopDescription, shopAddress } = formData;
  var errors = {};
  if (validator.isEmpty(shopName)) {
    errors = { ...errors, shopName: "The name is required." };
  } else {
    if (!validator.isLength(shopName, { min: 3, max: 20 })) {
      errors = {
        ...errors,
        shopName: "The name must be 3 to 20 characters.",
      };
    }
  }
  if (validator.isEmpty(shopDescription)) {
    errors = { ...errors, shopDescription: "The description is required." };
  } else {
    if (!validator.isLength(shopDescription, { min: 6, max: 120 })) {
      errors = {
        ...errors,
        shopDescription: "The description must be 20 to 120 characters.",
      };
    }
  }
  if (validator.isEmpty(shopAddress)) {
    errors = {
      ...errors,
      shopAddress: "The address is required.",
    };
  }

  return errors;
};

export const validateProduct = (formData) => {
  const { name, description, price, stock } = formData;
  var errors = {};
  if (validator.isEmpty(name)) {
    errors = { ...errors, name: "Give your product a name." };
  } else {
    if (!validator.isLength(name, { min: 5, max: 50 })) {
      errors = {
        ...errors,
        name: "The name must be 5 to 50 characters long.",
      };
    }
  }
  if (validator.isEmpty(description)) {
    errors = {
      ...errors,
      description: "Please mention a description of the product.",
    };
  }
  if (validator.isEmpty(price)) {
    errors = {
      ...errors,
      price: "Please mention the price of the product.",
    };
  }
  if (validator.isEmpty(stock)) {
    errors = {
      ...errors,
      stock: "Please mention the current quantity available.",
    };
  }

  return errors;
};

export const validateLogin = (formData) => {
  const { phone, email, password } = formData;
  var errors = {};
  if (phone === undefined) {
    if (validator.isEmpty(email)) {
      errors = { ...errors, email: "The email address is required." };
    } else {
      if (!validator.isEmail(email)) {
        errors = { ...errors, email: "This is not a valid email." };
      }
    }
  } else {
    if (validator.isEmpty(phone)) {
      errors = { ...errors, phone: "The phone number is required" };
    } else {
      if (!validator.isLength(phone, { min: 10, max: 10 })) {
        errors = { ...errors, phone: "This is not a valid phone number." };
      }
    }
  }
  if (validator.isEmpty(password)) {
    errors = { ...errors, password: "Password is required." };
  }
  return errors;
};

export const validateRegister = (formData) => {
  const { name, phone, email, password } = formData;
  var errors = {};
  if (validator.isEmpty(name)) {
    errors = { ...errors, name: "The name is required." };
  } else {
    if (!validator.isLength(name, { min: 3, max: 20 })) {
      errors = {
        ...errors,

        name: "The name must be 3 to 20 characters long.",
      };
    }
  }
  if (validator.isEmpty(phone)) {
    errors = { ...errors, phone: "The phone number is required." };
  } else {
    if (!validator.isLength(phone, { min: 10, max: 10 })) {
      errors = { ...errors, phone: "This is not a valid phone number." };
    }
  }
  if (validator.isEmpty(email)) {
    errors = { ...errors, email: "The email address is required." };
  } else {
    if (!validator.isEmail(email)) {
      errors = { ...errors, email: "This is not a valid email address." };
    }
  }
  if (validator.isEmpty(password)) {
    errors = { ...errors, password: "The password is required." };
  } else {
    if (!validator.isLength(password, { min: 8 })) {
      errors = {
        ...errors,
        password: "The password must be atleast 8 characters long.",
      };
    }
  }

  return errors;
};
