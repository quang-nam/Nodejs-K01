import { Router } from "express";
import validBodyRequest from "../../common/middlewares/validBodyRequest.js";

import {
  createSubCategory,
  getDetailSubCategory,
  getListSubCategory,
  restoreSubCategory,
  softDeleteSubCategory,
  updateSubCategory,
} from "./subcategory.controller.js";
import subCategorySchemaValidate from "./subcategory.schema.js";
import { deleteSubCategoryById } from "./subcategory.service.js";

const subCategoryRouter = Router();
subCategoryRouter.get("/", getListSubCategory);
subCategoryRouter.get("/:id", getDetailSubCategory);

subCategoryRouter.delete("/:id", deleteSubCategoryById);
subCategoryRouter.delete("/soft-delete/:id", softDeleteSubCategory);

// dung chung middleware
subCategoryRouter.use(validBodyRequest(subCategorySchemaValidate));
subCategoryRouter.patch("/:id", updateSubCategory);
subCategoryRouter.patch("/restore/:id", restoreSubCategory);
subCategoryRouter.post("/add", createSubCategory);
export default subCategoryRouter;
