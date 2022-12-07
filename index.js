const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const booksRouter = require('./routes/books');
const reviewsRouter = require('./routes/reviews');
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_APP_URL,
    ],
    credentials: true,
  })
);

app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.CLIENT_APP_URL,
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", false);
  }
  res.header("Access-Control-Allow-Headers", true);
  res.header("Access-Control-Allow-Credentials", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', booksRouter);
app.use('/api', reviewsRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const port = process.env.PORT || 8000;
    const dbHost = process.env.DB_HOST || localhost;

    app.listen(port, () => {
      console.log(`http://${dbHost}:${port}`);
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
