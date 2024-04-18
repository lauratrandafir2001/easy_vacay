const Room = require("../models/RoomModel.js");
const Hotel = require("../models/HotelModel.js");

module.exports.createRoom = async (req, res, next) => {
  const { hotelid } = req.params;
  const { name, description, price, availability } = req.body;

  if (!name || !description || !price || !availability) {
    const missingFields = [];

    if (!name) missingFields.push("name");
    if (!description) missingFields.push("description");
    if (!price) missingFields.push("price");
    if (!availability) missingFields.push("availability");

    return res.status(400).json({
      message: `Please fill all the fields. The following fields are missing: ${missingFields.join(
        ", "
      )}`,
    });
  }

  try {
    const hotel = await Hotel.findById(hotelid);
    if (!hotel) return res.status(404).json({ message: "Hotel not found." });

    const newRoom = new Room({
      name,
      description,
      price,
      availability,
      hotel: hotelid,
    });

    const room = await newRoom.save();
    hotel.rooms.push(room._id);
    await hotel.save();

    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports.updateRoom = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, availability } = req.body;

  try {
    const room = await Room.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        price,
        availability,
      },
      { new: true }
    );
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports.updateRoomAvailability = async (req, res, next) => {
  const { id } = req.params;
  const { availability } = req.body;

  try {
    const room = await Room.findOneAndUpdate(
      { _id: id },
      {
        availability,
      },
      { new: true }
    );
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteRoom = async (req, res, next) => {
  const { id, hotelid } = req.params;

  try {
    const room = await Room.findByIdAndDelete(id);
    const hotel = await Hotel.findById(hotelid);
    hotel.rooms = hotel.rooms.filter((room) => room._id !== id);
    await hotel.save();
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports.getRoom = async (req, res, next) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

module.exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
