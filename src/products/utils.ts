import { Context } from "https://deno.land/x/oak@v10.5.1/context.ts";
import { demo } from "../demo.ts";

export class Helper {
  static getParam(ctx: Context): string {
    return ctx.request.url.pathname.split("/").join("").at(-1) ?? "";
  }

  static foundElem(ctx: Context): boolean {
    const isFound = demo.find((item) => item.id === this.getParam(ctx))
      ? true
      : false;
    return isFound ?? false;
  }
}

export default {};
