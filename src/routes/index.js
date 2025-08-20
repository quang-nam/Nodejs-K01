import { Router } from "express";
import productRoutes from "../modules/product/product.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import subCategoryRouter from "../modules/subcategory/subcategory.routes.js";
const router = Router();
router.use("/products", productRoutes);
router.use("/category", categoryRoutes);
router.use("/subcategory", subCategoryRouter);
export default router;
