const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a phrase"],
    },
    phrase: {
      type: String,
      required: [true, "Please enter a phrase"],
      trim: true,
    },

    // type: {
    //   type: String,
    //   enum: {
    //     values: ["meta", "others"],
    //     message: "{VALUE} is not supported",
    //   },
    //   required: [true, "Please enter a type"],
    // },
  },
  { timestamps: true }
);

const dataModel = mongoose.model("Data", DataSchema)
module.exports = dataModel
