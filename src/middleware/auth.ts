import { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "http-status-codes";

import config from "config";
import jwt from "jsonwebtoken";
import Payload from "../types/Payload";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ msg: "No token, authorization denied" });
    }
    const payload: Payload | any = jwt.verify(token, config.get("jwtSecret"));
    next();
  } catch (err) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ msg: "Token is not valid" });
  }
}
