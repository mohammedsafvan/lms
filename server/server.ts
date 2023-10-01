import { app } from "./app";
import connectDb from "./utils/db";
require("dotenv").config();

// Creating server
app.listen(process.env.PORT, () => {
  console.log(`server runnning in ${process.env.PORT}`);
  connectDb()
});
