const { connect } = require("mongoose"),
  { PORT, MONGO_URL } = require("./keys"),
  { success, error } = require("consola");

const connectDB = async app => {
  try {
    await connect(process.env.MONGO_URI || MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    success({ message: `Connected to MongoDB...`, badge: true });

    app.listen(process.env.PORT || PORT, () => {
      success({ message: `Server started on port ${PORT}`, badge: true });
    });
  } catch (err) {
    error({ message: `Unable to Connect to database: ${err}`, badge: true });

    process.exit(1);
  }
};

module.exports = connectDB;
