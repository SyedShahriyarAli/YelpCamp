const mongoose = require('mongoose');
const cities = require('./cities.js');
const Campgroud = require('../Models/Campgroud');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind("connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campgroud.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campgroud({
            author: '5ffca1aa278be0184893665d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: [
                {
                    url: 'https://res.cloudinary.com/syedshahriyarali/image/upload/v1610482922/YelpCamp/wu8mv1xzeckpkmjcoclw.jpg',
                    filename: 'YelpCamp/wu8mv1xzeckpkmjcoclw'
                },
                {
                    url: 'https://res.cloudinary.com/syedshahriyarali/image/upload/v1610482922/YelpCamp/ub0pnpxhitobur8eedg7.jpg',
                    filename: 'YelpCamp/ub0pnpxhitobur8eedg7'
                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam dolores obcaecati nisi ducimus nobis, esse iste quam eos voluptates delectus exercitationem doloribus harum ex quod nostrum modi voluptatibus a aspernatur.',
            price: price
        });
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })