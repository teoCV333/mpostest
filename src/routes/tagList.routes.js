import { Router } from "express";
import { methods as tagListController} from "../controllers/tagList.controller";
/* import validateToken from "./validate.routes";
 */
const router = Router();

router.get("/", /* validateToken, */ tagListController.getTagLists);
router.get("/:id", /* validateToken, */ tagListController.getTagList);
router.post("/", /* validateToken, */ tagListController.postTagList);
router.put("/:id", /* validateToken, */ tagListController.updateTagList);
router.delete("/:id", /* validateToken, */ tagListController.deleteTagList);

export default router;