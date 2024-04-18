const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotel.js");

const hotelsRouter = express.Router();

hotelsRouter.post("/", createHotel);

hotelsRouter.put("/:id", updateHotel);

hotelsRouter.delete("/:id", deleteHotel);

hotelsRouter.get("/find/:id", getHotel);

hotelsRouter.get("/", getHotels);
hotelsRouter.get("/countByCity", countByCity);
hotelsRouter.get("/countByType", countByType);
hotelsRouter.get("/room/:id", getHotelRooms);

module.exports = hotelsRouter;
