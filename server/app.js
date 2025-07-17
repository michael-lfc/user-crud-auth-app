// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { dbConnect } from "./config/db.js";

// import userRouter from "./controllers/users.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware: parse URL-encoded bodies (for form data)
// app.use(express.urlencoded({ extended: true }));

// // Middleware: parse JSON bodies, but allow empty bodies without error
// app.use(express.json({ strict: false }));

// app.use(cors());
// app.use(express.json()); 

// // Routes
// app.use("/users", userRouter);

// // Health check
// app.get("/", (req, res) => {
//   res.send("User Creation API is running");
// });

// // Start server and connect to DB
// app.listen(PORT, () => {
//   dbConnect();
//   console.log(`[server]: Listening on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/db.js";

import userRouter from "./controllers/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware order:
// 1. Enable CORS early
app.use(cors());

// 2. Parse URL-encoded bodies (optional, if you expect form submissions)
app.use(express.urlencoded({ extended: true }));

// 3. Parse JSON bodies; allow empty bodies with strict: false if needed

app.use(express.json())
// Routes
app.use("/users", userRouter);

// Health check
app.get("/", (req, res) => {
  res.send("User Creation API is running");
});

// Start server and connect to DB
app.listen(PORT, () => {
  dbConnect();
  console.log(`[server]: Listening on port ${PORT}`);
});
