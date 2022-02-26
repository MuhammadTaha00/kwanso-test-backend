import HttpStatusCodes from "http-status-codes";
import { Router, Request, Response } from "express";

import auth from "../../middleware/auth";
import Task, { ITask } from "../../models/Task";
import { taskValidationRules, validate } from "../../middleware/validator";

const router: Router = Router();

/**
 * @summary create task API
 */
router.post(
  "/",
  auth,
  taskValidationRules(),
  validate,
  async (req: Request, res: Response) => {
    try {
      const { name } = req.body as ITask;
      const taskObj = {
        name,
      };
      let task = new Task(taskObj);
      task = await task.save();
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

/**
 * @summary Find all tasks
 */
router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const task: ITask = await Task.find().lean();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
});

export default router;
