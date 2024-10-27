import { mongodbUrl, serverPort } from "./config";
import connectDb from "./db";
import { app } from "./app";

const port = serverPort;

connectDb(mongodbUrl!);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
