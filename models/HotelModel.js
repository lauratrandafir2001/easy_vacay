const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  img: {
    type: String,
  },
  location: {
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
});

const Hotel = mongoose.model("Hotel", HotelSchema);

module.exports = Hotel;
