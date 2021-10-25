const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "614cd52f75594639e4939167",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eligendi magnam, soluta vitae nesciunt provident rem. Animi labore aliquid totam hic doloribus aut incidunt? Officia exercitationem dolore praesentium animi provident!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dessas/image/upload/v1633289938/YelpCamp/svog1soe6pm0lwy1hi4s.jpg",
          filename: "YelpCamp/svog1soe6pm0lwy1hi4s",
        },
        {
          url: "https://res.cloudinary.com/dessas/image/upload/v1633289938/YelpCamp/w46nlzgta4zql8yqz5ua.jpg",
          filename: "YelpCamp/w46nlzgta4zql8yqz5ua",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
