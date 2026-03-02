import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


import authRoutes from './routes/authRoutes.js';


dotenv.config();


const __dirname = path.resolve();


const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

app.use(express.json());


app.use("/api/auth", authRoutes);



if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running in ESM mode on port ${PORT}`);
});