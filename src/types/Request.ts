import { Request } from "express";
import Payload from "./Payload";

/**
 *
 * @param userId:string
 */
type request = Request & Payload;

export default request;
