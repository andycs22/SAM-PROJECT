export const LOGIN_VALIDATIONS = {
  email: {
    required: "The email is required",
    pattern: {
      message: "The email is not valid",
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  password: {
    required: "The password should be in place",
    minLength: {
      message: "Password length should be greater than 6",
      value: 6
    }
  }
};

export const REGISTER_VALIDATIONS = {
  name: {
    required: "The name is required"
  },
  email: {
    required: "The email is required",
    pattern: {
      message: "The email is not valid",
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  password: {
    required: "The password should be in place",
    minLength: {
      message: "Password length should be greater than 6",
      value: 6
    }
  }
};

export const EDITPRODUCT_VALIDATIONS = {
  theRest: {
    required: "The theRest should be in place",
    minLength: {
      message: "por defecto",
      value: 1
    }
  },
  productId: {
    required: "The id should be in place",
    minLength: {
      message: "por defecto",
      value: 1
    }
  },
  init_price: {
    required: "The init_price should be in place",
    minLength: {
      message: "introducir precio inicial",
      value: 1
    }
  },
  discount: {
    required: "The discount should be in place",
    minLength: {
      message: "introducir descuento",
      value: 1
    }
  },
  final_price: {
    required: "The init_price should be in place",
    minLength: {
      message: "introducir precio inicial",
      value: 1
    }
  }
};
