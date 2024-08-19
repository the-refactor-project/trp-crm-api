import startServer from "./server/startServer.js";

const port = process.env.PORT || 4005;

startServer(Number(port));
