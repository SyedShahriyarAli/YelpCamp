const mongoose = require('mongoose');
const cities = require('./cities.js');
const Campgroud = require('../Models/Campgroud');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb+srv://syedshahriyarali:y4RatJdxNP2G4tAc@cluster0.ttnjb.mongodb.net/yelpCamp?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

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
            author: '617ee3b19e0d310016f0bdc8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: [
                {
                    url: 'https://res.cloudinary.com/syedshahriyarali/image/upload/v1635705985/YelpCamp/oq1pfl8s3dh52uyqc752.jpg',
                    filename: 'YelpCamp/oq1pfl8s3dh52uyqc752'
                },
                {
                    url: 'https://res.cloudinary.com/syedshahriyarali/image/upload/v1635709872/YelpCamp/lclqyknw6xah8rpvk94g.jpg',
                    filename: 'YelpCamp/lclqyknw6xah8rpvk94g'
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