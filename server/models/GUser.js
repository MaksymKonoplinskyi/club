import mongoose from "mongoose"

const GUserSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    gAvatarUrl: {
        type: String,
        required: true,
      },
    // email: {
    //     type: String,
    //     required: true,
    // },
    // fullName: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    // passwordHash: {
    //     type: String,
    //     required: true,
    // },
    // avatarUrl: String,
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

export default mongoose.model("GUser", GUserSchema)
