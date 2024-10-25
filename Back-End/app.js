const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const userRouter = require("./routes/userRoutes");
const restaurantRouter = require("./routes/restaurantRoutes");
// const reviewRouter = require("./routes/reviewRoutes");

const app = express();

// Development logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.json("Hello World");
});

// app.use("/api/v1/apartments", apartmentRoutes);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/restaurants", restaurantRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
