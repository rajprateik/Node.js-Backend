const { ObjectID } = require("bson");
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer,
  },
});

mongoose.model("Form", formSchema);
