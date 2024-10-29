import dotenv from "dotenv";
import express from "express";
import axios from "axios";
dotenv.config({ path: "./" });

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT} `);
});
