import { serveDir } from "https://deno.land/std@0.207.0/http/file_server.ts";

Deno.serve((req) => serveDir(req, { fsRoot: "./", showIndex: true }));
