import express from "express";
import {
  createCategory,
  listCategory,
  readCategory,
  removeCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { authenticate, authorise } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/").post(authenticate, authorise, createCategory);
router.route("/categories").get(listCategory);
router.route("/:categoryId").get(readCategory);
router
  .route("/:categoryId")
  .put(authenticate, authorise, updateCategory)
  .delete(authenticate, authorise, removeCategory);
export default router;
