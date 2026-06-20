import mongoose from "mongoose";

const SiteStatusSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true }, // matches lib/sites.js slug
    lastTitle: { type: String, default: null }, // latest scraped headline/notice text
    severity: {
      type: String,
      enum: ["CRITICAL", "MINOR", "SOON", "NOISE"],
      default: "NOISE",
    },
    url: { type: String, default: null }, // direct link to the notice, if found
    lastCheckedAt: { type: Date, default: null },
    lastChangedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.SiteStatus ||
  mongoose.model("SiteStatus", SiteStatusSchema);