// deno-lint-ignore-file no-explicit-any

import express from "npm:express@4.21.1";

import { parseArgs } from "jsr:@std/cli/parse-args";


const { args } = Deno;
const DEFAULT_PORT = 8000;
const argPort = parseArgs(args).PORT || Number(Deno.env.get("PORT"));
console.log("argPort", argPort);
const port = argPort ? Number(argPort) : DEFAULT_PORT;
// Create a new app
const app = new express();

// Define the GET /api/friends endpoint
app.get("/api/friends", (_req: any, res: any) => {
  res.send([
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
  ]);
});

app.use(express.json());
app.use(express.static("dist"));

// Serve static files and index.html


// Start the server
console.log("Server is running on http://localhost:8000");
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
