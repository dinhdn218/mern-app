require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const app = express();
const cors = require("cors");
const route = require("./routes/index.route");
const db = require("./config/db/index");

app.use(express.json());
app.use(cors());

// connect db
db.connect();

// routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

// client => GET => Middleware  =>SERVER
