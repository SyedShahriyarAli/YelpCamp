# Yelpcamp

Welcome to Yelpcamp, my first project on node.js and mongodb! Yelpcamp is a platform on which users can sign up and share their experiences about campgrounds they have visited. Users can also view campgrounds posted by others, leave comments, and rate their experiences.

## Features

Yelpcamp has the following features:

- User authentication: Users can sign up, log in, and log out using their email and password.
- Campground posting: Users can create, edit, and delete campgrounds, including a title, description, and image.
- Commenting: Users can leave comments on campgrounds posted by others.
- Rating: Users can rate campgrounds on a scale of 1-5 stars.

## Installation

To install Yelpcamp, follow these steps:

1. Clone this repository: `git clone https://github.com/SyedShahriyarAli/YelpCamp.git`
2. Install the necessary dependencies: `npm install`
3. Set up a local MongoDB instance or use a cloud-based service like MongoDB Atlas.
4. Create a `.env` file with the following variables:
  - CLOUDINARY_CLOUD_NAME=cloudinary-cloud-name
  - CLOUDINARY_KEY=cloudinary-key
  - CLOUDINARY_SECRET=cloudinary-url
  - DB_URL=database-url
  - SECRET=your-session-secret
5. Run the app: `npm start`

## Technologies Used

Yelpcamp was built using the following technologies:

- Node.js
- Express
- MongoDB
- Passport.js
- EJS templating engine
- Bootstrap CSS framework

## Contributing

If you would like to contribute to Yelpcamp, please follow these steps:

1. Fork this repository.
2. Create a new branch: `git checkout -b new-feature`
3. Make your changes and commit them: `git commit -m 'Add new feature'`
4. Push to the original branch: `git push origin new-feature`
5. Create a pull request.

## Acknowledgements

I would like to thank the following resources for their help in building Yelpcamp:

- Colt Steele's Web Developer Bootcamp on Udemy
- MongoDB documentation
- Express documentation
