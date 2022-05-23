import { Context } from "https://deno.land/x/oak@v10.5.1/context.ts";
import { demo } from "../demo.ts";
import { Helper } from "./utils.ts";

// services <- Database
export interface Product {
  id: string;
  name: string;
  desc: string;
  price: number;
}

//@description Get all products
//@route GET /api/v1/products
export class Products {
  constructor() {}

  getProducts(ctx: Context) {
    ctx.response.body = {
      demo,
    };
  }

  //@description Get single products
  //@route GET /api/v1/products/:id
  getProduct(ctx: Context) {
    if (!Helper.foundElem(ctx)) {
      ctx.response.body = {
        msg: "Product not found",
      };
      return;
    }

    const item = demo.find((item) => item.id === Helper.getParam(ctx));
    ctx.response.body = {
      item,
    };
  }

  //@description Add Product
  //@route GET /api/v1/products
  async addProduct(ctx: Context) {
    const body = await ctx.request.body().value;

    if (!ctx.request.hasBody) {
      ctx.response.body = {
        msg: "No data",
      };
      return;
    }

    const newOne = {
      id: crypto.randomUUID(),
      ...body,
    };
    demo.push(newOne);

    ctx.response.body = {
      newOne,
    };
  }

  //@description Update Product
  //@route GET /api/v1/products/:id
  async updateProduct(ctx: Context) {
    if (!Helper.foundElem(ctx)) {
      ctx.response.body = {
        msg: "Product not found",
      };
      return;
    }

    const { name } = await ctx.request.body().value;
    const updated = demo.map((item) =>
      item.id === Helper.getParam(ctx) ? { ...item, name } : item
    );

    ctx.response.body = {
      updated,
    };
  }

  //@description Delete Product
  //@route GET /api/v1/products/:id
  deleteProduct(ctx: Context) {
    if (!Helper.foundElem(ctx)) {
      ctx.response.body = {
        msg: "Product not found",
      };
      return;
    }

    const filtered = demo.filter((item) => item.id !== Helper.getParam(ctx));
    ctx.response.body = {
      msg: "deleted",
      filtered,
    };
  }
}

export const services = new Products();

export default {};
