const { Schema, model } = require("mongoose"),
  { isEmail } = require("validator"),
  { hash, genSalt, compare } = require("bcryptjs");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      min: 6,
      max: 32,
    },

    email: {
      type: String,
      lowercase: true,
      lowercase: true,
      required: [true, "Please Enter an email"],
      unique: true,
      validate: [isEmail, "Please Enter a Valid Email"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Please Enter Password"],
      minlength: [6, "Minimum password length is 6 characters long"],
    },

    profPic: {
      type: String,
      default: "",
    },

    coverPic: {
      type: String,
      default: "",
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await genSalt(10);

    this.password = await hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.isValidPass = async function (password) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = model("user", UserSchema);
