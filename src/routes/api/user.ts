import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import auth from "../../middleware/auth";
import Request from "../../types/Request";
import User, { IUser } from "../../models/User";

const router: Router = Router();

/**
 * @summary user data  API
 */

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const user: IUser = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
