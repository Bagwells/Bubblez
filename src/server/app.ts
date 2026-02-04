import "dotenv/config";
import express, { Request, Response, Application } from "express";
import emailRoutes from "./routes/emailRoutes";
import contactRoutes from "./routes/contactRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }
  next();
});

// Routes
app.use("/api", emailRoutes);
app.use("/api/contact", contactRoutes);


// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response,) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
}

export default app;
