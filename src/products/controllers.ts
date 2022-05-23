import { Router } from "https://deno.land/x/oak@v10.5.1/router.ts";
import { services } from "./services.ts";

//controller <- service
export const routers = new Router();

routers
  .get("/api/v1/products", services.getProducts)
  .get("/api/v1/products/:id", services.getProduct)
  .post("/api/v1/products", services.addProduct)
  .put("/api/v1/products/:id", services.updateProduct)
  .delete("/api/v1/products/:id", services.deleteProduct);

export default {};
