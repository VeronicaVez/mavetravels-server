const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'User name is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    reviews: [{
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }],
    travels: [{
      type: Schema.Types.ObjectId,
      ref: 'Travel'
    }]
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
