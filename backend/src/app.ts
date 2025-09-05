import express from "express";
import cors from "cors";
import productsRouter from "./routes/product.route";
import ordersRouter from "./routes/order.route";
import bodyParser from "body-parser";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));


app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ error: message });
});

export default app;
