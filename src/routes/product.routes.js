import { Router } from "express"
import { methods as productController } from "../controllers/product.controller"

const router =  Router()

router.post('/', productController.postProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.get('/by-name/:name', productController.getProductByName);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;