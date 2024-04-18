const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} = require("../controllers/room.js");

const roomsRouter = express.Router();

roomsRouter.post("/:hotelid", createRoom);

roomsRouter.put("/availability/:id", updateRoomAvailability);
roomsRouter.put("/:id", updateRoom);

roomsRouter.delete("/:id/:hotelid", deleteRoom);

roomsRouter.get("/:id", getRoom);

roomsRouter.get("/", getRooms);

module.exports = roomsRouter;
