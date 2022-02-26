import config from "config";
import jwt from "jsonwebtoken";
import Payload from "../types/Payload";

export const createJwt = (payload: Payload) => {
  return jwt.sign(
    payload,
    config.get("jwtSecret"),
    { expiresIn: config.get("jwtExpiration") }
    // (err, token) => {
    //   if (err) throw err;
    //   res.json({ token });
    // }
  );
  //   return jwt.sign(payload, privateKey, {
  //     ...signOptions,
  //     subject: payload.username,
  //   });
};
