const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/videos");

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static("public"));
app.use(express.json());

app.use("/videos", userRouter);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
