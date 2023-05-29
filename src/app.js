require("dotenv/config");
const express = require("express");
const router = require("./routes/users.routes");

const app = express();
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5656;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
