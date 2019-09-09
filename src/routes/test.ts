import * as Router from "koa-router";

const router = new Router();

router.get("/", async ctx => {
  ctx.body = "Hi TS";
});

router.get("/api", async ctx => {
  ctx.body = "Hi Api";
});

router.get("/*", async ctx => {
  ctx.body = "404 Not Found";
  ctx.status = 404;
});

export default router;
