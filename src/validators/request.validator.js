const { body } = require("express-validator");

const signupValidationRules = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username Should not be empty")
    .isLength({ min: 3 })
    .withMessage("Username Should Be Atleast 3 Characters Long"),

  body("email")
    .if(body("email").notEmpty())
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email Should not be empty"),

  body("phone")
    .if(body("phone").notEmpty())
    .trim()
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    .withMessage("Phone Should not be empty"),

  body("password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one symbol"
    ),
];

module.exports = {
  signupValidationRules,
};
