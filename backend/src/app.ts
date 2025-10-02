import { Hono } from 'hono'
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';

const app = new Hono()
app.use("*", logger());

// app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("*", serveStatic({ root: "../../frontend/dist" }));
app.get("*", serveStatic({ path: "../../frontend/dist/index.html" }));

export default app
