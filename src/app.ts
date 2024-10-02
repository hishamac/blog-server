import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import postRoutes from "./routes/posts";
import userRoutes from "./routes/users";
import notificationRoutes from "./routes/notifications";
import commentRoutes from "./routes/comments";
import postTypeRoutes from "./routes/postTypes";
import languageRoutes from "./routes/languages";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

// Enable CORS
app.use(cors());

// Body parser middleware to parse JSON
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/post-types", postTypeRoutes);
app.use("/api/languages", languageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
