export const registerValidationSchema = {
  first_name: {
    exists: {
      errorMessage: "First name is required",
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "First name should be at least 2 characters",
    },
  },
  last_name: {
    exists: {
      errorMessage: "Last name is required",
    },
    isLength: {
      options: { min: 2 },
      errorMessage: "Last name should be at least 2 characters",
    },
  },
  email: {
    exists: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Email is not valid",
    },
  },
  password: {
    exists: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 characters",
    },
  },
}
