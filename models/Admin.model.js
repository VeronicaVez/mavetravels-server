const { Schema, model } = require("mongoose")

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'User name is required.'],
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
    },
    travels: [{
      type: Schema.Types.ObjectId,
      ref: 'Travel'
    }]
  },
  {
    timestamps: true
  }
)

const Admin = model("Admin", adminSchema)

module.exports = Admin