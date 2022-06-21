const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // 루트 주소에 접속하면
  res.send("It's Bal's background !"); // 해당 응답을 보낸다.
});

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const port = 7303;
app.listen(port, () => console.log(`Listening on ${port} port`));

const cors = require("cors");
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
