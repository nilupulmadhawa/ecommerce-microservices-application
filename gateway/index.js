const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/item", proxy("http://localhost:8002"));
app.use("/api/rating", proxy("http://localhost:8004"));
app.use("/api/user", proxy("http://localhost:8001"));
app.use("/", proxy("http://localhost:8003")); // products

app.listen(8000, () => {
    console.log("Gateway is Listening to Port 8000");
});
