import chalk from "chalk";
import connectToDb from "./database/index.js";
import startServer from "./server/startServer.js";

const port = process.env.PORT || 4005;
const mongoDbUrl = process.env.MONGODB_URL;

if (!mongoDbUrl) {
  console.log(chalk.red("Missing MongoDB URL"));

  process.exit(1);
}

await connectToDb(mongoDbUrl);
startServer(Number(port));
