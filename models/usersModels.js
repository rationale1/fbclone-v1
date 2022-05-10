const { Schema, model } = require("mongoose"),
  { isEmail } = require("validator"),
  { hash, genSalt, compare } = require("bcryptjs");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 15,
    },

    email: {
      type: String,
      lowercase: true,
      required: [true, "Please Enter an email"],
      unique: true,
      validate: [isEmail, "Please Enter a Valid Email"],
    },

    password: {
      type: String,
      required: [true, "Please Enter Password"],
      minlength: [6, "Minimum password length is 6 characters long"],
    },

    articles: [
      {
        type: Schema.Types.ObjectId,
        ref: "art",
      },
    ],
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
