import express from "express";
import cors from "cors";
const app = express();

const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Welcome to the server!");
});

// routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
