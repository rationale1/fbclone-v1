const { connect } = require("mongoose"),
  { PORT, MONGO_URL, MONGO_URL_LOCAL } = require("./keys"),
  { success, error } = require("consola");

const connectDB = async app => {
  try {
    await connect(MONGO_URL_LOCAL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    success({ message: `Connected to MongoDB...`, badge: true });

    app.listen(PORT || 5000, () => {
      success({ message: `Server started on port ${PORT}`, badge: true });
    });
  } catch (err) {
    error({ message: `Unable to Connect to database: ${err}`, badge: true });

    process.exit(1);
  }
};

module.exports = connectDB;
