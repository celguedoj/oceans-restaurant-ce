import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

const router = Router();
const orderController = new OrderController();

router.get("/", orderController.getOrders.bind(orderController));
router.post("/", orderController.createOrder.bind(orderController));

export default router;
