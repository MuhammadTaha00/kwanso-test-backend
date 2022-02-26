import { Router, Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import config from "config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Payload from "../../types/Payload";
import User, { IUser } from "../../models/User";
import { createJwt } from "../../utils/index";
import {
  userRegisterValidationRules,
  userLoginValidationRules,
  validate,
} from "../../middleware/validator";
const router: Router = Router();

/**
 * @summary user register  API
 */
router.post(
  "/register",
  userRegisterValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body as IUser;
    try {
      let user: IUser = await User.findOne({ email });

      if (user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "User already exists",
            },
          ],
        });
      }

      const salt: string = await bcrypt.genSalt(10);
      const hashed: string = await bcrypt.hash(password, salt);

      const userFields = {
        email,
        password: hashed,
      };

      user = new User(userFields);

      user = await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

/**
 * @summary user login  API
 */
router.post(
  "/login",
  userLoginValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    const { email, password } = req.body as IUser;
    try {
      let user: IUser = await User.findOne({ email });

      if (!user) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials",
            },
          ],
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Invalid Credentials",
            },
          ],
        });
      }

      const payload: Payload = {
        userId: user.id,
      };
      const token: string = createJwt(payload);

      // jwt.sign(
      //   payload,
      //   config.get("jwtSecret"),
      //   { expiresIn: config.get("jwtExpiration") },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token });
      //   }
      // );
      res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

export default router;
