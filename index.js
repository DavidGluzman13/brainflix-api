const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/videos");

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static("public"));
app.use(express.json());

// Mount the router at the "/videos" path
app.use("/videos", userRouter);

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
