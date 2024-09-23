import express from "express";
import connectDB from "./config/database";
import postRoutes from "./routes/posts";
import userRoutes from "./routes/users";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
