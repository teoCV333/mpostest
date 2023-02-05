import { Router } from "express";
import { methods as categoryController} from "../controllers/category.controller";
/* import validateToken from "./validate.routes";
 */
const router = Router();

router.get("/", /* validateToken, */ categoryController.getCategories);
router.get("/:id", /* validateToken, */ categoryController.getCategory);
router.get("/by-name/:name", /* validateToken, */ categoryController.getCategoryByName);
router.post("/", /* validateToken, */ categoryController.postCategory);
router.put("/:id", /* validateToken, */ categoryController.updateCategory);
router.delete("/:id", /* validateToken, */ categoryController.deleteCategory);

export default router;