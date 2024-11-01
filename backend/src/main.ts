import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { connectDB, disconnectDB, createTable } from "./services/db.services.ts";

await connectDB();
await createTable();

const app = new Application();

// Log each request
app.use(async (context, next) => {
  console.log(`${context.request.method} ${context.request.url}`);
  await next();
});

// Handle 404 Not Found
app.use((context) => {
  context.response.status = 404;
  context.response.body = { message: "Not Found" };
});



// Start Server
const port = 8000;
console.log(`Server is running on http://localhost:${port}`);
await app.listen({ port });

addEventListener("unload", async () => {
  await disconnectDB();
  console.log("Disconnected from the database");
});
