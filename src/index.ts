import { mongodbUrl, serverPort } from "./config";
import connectDb from "./db";
import express from "express";
const app = express();
const port = serverPort;

connectDb(mongodbUrl!);

app.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("sdasd");
});

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
