const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    status: {
      type: String,
      enum:['ON', 'OFF'],
      default: 'ON'
    },
    type_product: {
        type: String,
        enum:['CODE', 'DOCUMENT', 'MEDIA'],
        required: true
      }
    
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;
