//Server Init and config setup

// 1) Load up all of our keys and values from the .env file into memory
// (we can access this through an object called "process.env")
require("dotenv").config();

// 1) Imports of 3rd-party Libraries
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser'); // to be able to read cookies

// 3) Intiliazing Express instance ('app') and define auxiliar variables
const app = express();
const port = 8000;

// 4) Enabling settings for being able to read JSON and parse url encoded data in requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// 5) Configuring cors in Express instace ('app')
const corsOptions = {
  credentials: true, // Allow credentials (cookies) to be sent to/from origin
  origin: 'http://localhost:5173', // vite localhost: 5173 // Allow only this origin
  methods: 'GET, POST, PUT, DELETE', // Allow these methods
  // allowedHeaders: 'Content-Type, Authorization', // Allow these headers
};
app.use(cors(corsOptions));

// 6) Incorporating cookie-parser middleware to Express instance ('app')
app.use(cookieParser());

// 7) Initializing connection to NoSQL database (MongoDB) using Moongose interface
require("./config/mongoose.config");

// 8) Importing API routes and incorporating them to 'app' instance
const UserRouter = require("./routes/user_routes");
const RecipeRouter = require("./routes/recipe_routes");
const IngredientRouter = require("./routes/ingredients_routes");
app.use('/api/users/', UserRouter);
app.use('/api/recipe/', RecipeRouter);
app.use('/api/ingredients/', IngredientRouter);

// 8) Running instance of Express server in selected port
app.listen(port, () => console.log(`Listening on port: ${port}`));