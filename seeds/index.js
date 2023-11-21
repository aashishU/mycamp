const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/mycamp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '654cbfbc8e79da8e1079909f', //gives every campground the same author while Seeding data
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa odit similique ducimus possimus, reiciendis corporis, ad sapiente, deserunt aut recusandae tenetur adipisci.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfjkjdfdo/image/upload/v1700451572/YelpCamp/s2ihfzwoiohj65n5anit.jpg',
                    filename: 'YelpCamp/s2ihfzwoiohj65n5anit'
                },
                {
                    url: 'https://res.cloudinary.com/dfjkjdfdo/image/upload/v1700451575/YelpCamp/auyowchmorrlsty05wcf.jpg',
                    filename: 'YelpCamp/auyowchmorrlsty05wcf'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})