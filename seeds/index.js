const mongoose = require('mongoose');
const cities = require('./cities.js');
const Campgroud = require('../Models/Campgroud');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb+srv://syedshahriyarali:y4RatJdxNP2G4tAc@cluster0.ttnjb.mongodb.net/yelpCamp?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind("connection error:"));
db.once("open", () => {
    console.log("Database connected");
    seedDB()
        .then(() => {
            mongoose.connection.close();
        })
    console.log("Completed")    
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campgroud.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campgroud({
            author: '61890f8bb4bba5337c7e4168',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: [
                {
                    url: 'https://res.cloudinary.com/syedshahriyarali/image/upload/v1636377038/YelpCamp/shahriyar/y56x3267a3g0p04yvkpp.jpg',
                    filename: 'YelpCamp/shahriyar/y56x3267a3g0p04yvkpp'
                },
                {
                    url: 'https://res.cloudinary.com/syedshahriyarali/image/upload/v1636377040/YelpCamp/shahriyar/ejtacxbjqbfjufvtpgnc.jpg',
                    filename: 'YelpCamp/shahriyar/ejtacxbjqbfjufvtpgnc'
                }
            ],
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam dolores obcaecati nisi ducimus nobis, esse iste quam eos voluptates delectus exercitationem doloribus harum ex quod nostrum modi voluptatibus a aspernatur.',
            price: price
        });
        await camp.save();
    }
}