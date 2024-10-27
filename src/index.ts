import { mongodbUrl, serverPort } from "./config";
import connectDb from "./db";
import { app } from "./app";


connectDb(mongodbUrl!);

app.listen(serverPort, () => {
  console.log(`server started on ${serverPort||6000}`);
});
