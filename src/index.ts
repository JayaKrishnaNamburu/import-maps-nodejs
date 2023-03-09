import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import random from "random-facts";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const app = express();
app.use(morgan("tiny"));
app.get("/", (request, response) => {
  response.send(random.randomFact());
});

app.get("/map", (request, response) => {
  const nodeImportMapPath = join(
    fileURLToPath(new URL("../", import.meta.url)),
    "node.importmap"
  );
  response.json(
    JSON.parse(readFileSync(nodeImportMapPath, { encoding: "utf8" }))
  );
});

app.listen(3000, () => {
  console.log(chalk.green("Listening on port 3000...."));
});
