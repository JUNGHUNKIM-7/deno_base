import { Application } from "https://deno.land/x/oak@v10.5.1/application.ts";
import { routers } from "./products/controllers.ts";

const port = 5000;
const app = new Application();

app.use(
  async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
  },
);

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

//app main <- path folder(controllers)
app.use(routers.routes());
app.use(routers.allowedMethods());

await app.listen({ port });
