import express from "express";
import { Controller } from "../controllers/controller";
const router = express.Router();
0
const controller = new Controller();
router.get("/machines", controller.getGQLMachines);
router.get("/machine/:id", controller.getGQLMachine);

export = router;
