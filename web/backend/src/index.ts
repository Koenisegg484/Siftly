import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import helmet from 'helmet';
import healthCheckRoutes from "./routes/healthCheck";  

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(express.json());
// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Exact origin of your frontend
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
  }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", healthCheckRoutes);  // Add health check route
app.use("/api/getAllProducts", productRoutes);
app.use("/api/createProduct", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
