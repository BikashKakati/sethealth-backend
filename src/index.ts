import { mongodbUrl, serverPort } from "./config";
import connectDb from "./db";
const express = require("express");
const app = express();
const port = serverPort;

console.log(mongodbUrl);

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("sdasd");
});

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
