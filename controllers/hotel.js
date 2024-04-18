const Hotel = require("../models/HotelModel.js");
const Room = require("../models/RoomModel.js");

module.exports.createHotel = async (req, res, next) => {
  const { name, location, price, rooms } = req.body;

  const { city, country, distance, address } = location;

  if (!name || !city || !country || !distance || !price) {
    const missingFields = [];

    if (!name) missingFields.push("name");
    if (!city) missingFields.push("city");
    if (!country) missingFields.push("country");
    if (!distance) missingFields.push("distance");
    if (!price) missingFields.push("price");

    return res.status(400).json({
      message: `Please fill all the fields. The following fields are missing: ${missingFields.join(
        ", "
      )}`,
    });
  }

  try {
    const newHotel = new Hotel({
      name,
      location: {
        city,
        country,
        address,
        distance,
      },
      price,
      rooms,
    });

    const hotel = await newHotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

module.exports.updateHotel = async (req, res, next) => {
  const { id } = req.params;
  const { name, location, price, rooms } = req.body;

  const { city, country, distance } = location;

  try {
    const hotel = await Hotel.findOneAndUpdate(
      { _id: id },
      {
        name,
        location: {
          city,
          country,
        },
        price,
        rooms,
      },
      { new: true }
    );
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

module.exports.getHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({ _id: id });
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

module.exports.getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

module.exports.countByCity = async (req, res, next) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $group: {
          _id: "$location.city",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

module.exports.countByType = async (req, res, next) => {
  try {
    const hotels = await Hotel.aggregate([
      {
        $unwind: "$rooms",
      },
      {
        $group: {
          _id: "$rooms.type",
          count: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

module.exports.getHotelRooms = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({ _id: id }).populate("rooms");
    res.status(200).json(hotel.rooms);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteHotel = async (req, res, next) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOneAndDelete({ _id: id });
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
