const express = require("express"),
  app = express(),
  cors = require("cors"),
  helmet = require("helmet"),
  morgan = require("morgan"),
  createError = require("http-errors"),
  cookieParser = require("cookie-parser"),
  connectDB = require("./config/ConnectDB"),
  path = require("path");

/** ............MiddleWares......... */
app.use(
  express.json({ limit: "50mb", extended: true }),
  express.urlencoded({ extended: true }),
);
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

/** ............Connect to the Database......... */
connectDB(app);

// Static file
app.use("/public", express.static(path.join(__dirname, "uploads")));

/**............Configure the Routes........... */
// app.use("/api/users", require("./routes/user2Route"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/postRoutes"));

/** ....404 Error and Forward to Error Handler...... */
app.use((req, res, next) => {
  next(createError.NotFound());
});

/** ............Error Handler Function......... */
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    status: err.status || 500,
  });
});

/** .......Serve Static assets if in Production.... */
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/* ................Start Server............ */
// app.listen(process.env.PORT || 5000, () => console.log("Server Started"));
