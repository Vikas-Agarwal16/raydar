import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    image: {
      type: String,
      default: null,
    },
    enabledSites: {
  type: [String], // array of site slugs from lib/sites.js
  default: [],
},
onboardingComplete: {
  type: Boolean,
  default: false,
},

telegramChatId: {
  type: String,
  default: null,
},

lastDigestSentAt: {
  type: Date,
  default: null,
},

pushSubscription: {
  type: Object,
  default: null,
},

  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);