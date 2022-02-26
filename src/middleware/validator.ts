import { check, validationResult } from "express-validator/check";
import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";

export const userRegisterValidationRules = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ];
};
export const userLoginValidationRules = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ];
};
export const taskValidationRules = () => {
  return [check("name", "name is required").not().isEmpty()];
};
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  } else {
    return next();
  }
};
// module.exports = {
//   userRegisterValidationRules,
//   userLoginValidationRules,
//   taskValidationRules,
//   validate,
// };
