import express from "express"
import { createCartController } from "../controllers/cartController.js";

export default function createCartRouter(db){
    const router = express.Router()
    const ctrl = createCartController(db)

    // Get => list items /api/cart/
    router.get("/", ctrl.list)
    // post => create items  /api/cart/
    router.post("/", ctrl.create)
    // delete => remove item by id  /api/cart/:id
    router.delete("/:id", ctrl.delete)
    return router
}