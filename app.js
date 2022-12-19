const express = require("express");
const morgan = require("morgan");

const AppError = require("./src/utils/appError");
const tourRouter = require("./src/routes/tourRoutes");
const userRouter = require("./src/routes/userRoutes");

const app = express();
// Middlewares
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use(express.json());
// app.use(express.static(`${__dirname}/public/`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/tours/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
module.exports = app;
