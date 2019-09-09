import * as Koa from "koa";

import router from "./routes/test";

const app = new Koa();

app.use(async (ctx, next) => {
  // Log the request to the console
  console.log("Url: ", ctx.url);

  // Pass the request to the next middleware function
  await next();
});

app.use(router.routes());

app.listen(8080);

console.log("Server running on port 8080");
