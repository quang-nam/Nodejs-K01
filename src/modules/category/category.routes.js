import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getDetailCategory,
  getListCategory,
  restoreCategory,
  softDeleteCategory,
  updateCategory,
} from "./category.controller.js";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";
import categorySchema from "./category.schema.js";

const categoryRoutes = Router();
categoryRoutes.get("/", getListCategory);
categoryRoutes.get("/:id", getDetailCategory);

categoryRoutes.delete("/:id", deleteCategory);
categoryRoutes.delete("/soft-delete/:id", softDeleteCategory);

// dung chung middleware
categoryRoutes.use(validBodyRequest(categorySchema));
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.patch("/restore/:id", restoreCategory);
categoryRoutes.post("/add", createCategory);
export default categoryRoutes;
