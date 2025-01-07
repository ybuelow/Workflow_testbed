import mongoose from "mongoose";

const memorySchema = new mongoose.Schema({
  titel: {
    type: String,
    required: true,
  },
  beschreibung: {
    type: String,
    required: true,
  },
  bild: {
    type: String,
    required: false,
  },
  Video: {
    type: String,
    required: false,
  },
  grantedPeople: {
    type: [String],
    required: false,

    required: true,
  },
  creator: {
    type: String,
    ref: "users",
    required: true,
  },
});
const model = mongoose.model("memorys", memorySchema);

export { model };
