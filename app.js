const express = require("express");
const morgan = require("morgan");

const AppError = require("./src/utils/appError");
const globalErrorHandler = require("./src/controllers/errorController");
const tourRouter = require("./src/routes/tourRoutes");
const userRouter = require("./src/routes/userRoutes");

const app = express();
// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public/`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });
});

app.use(globalErrorHandler);

module.exports = app;
