//Import express and store it in a variable
const express = require('express');

//Initialize express with above variable
const app = express();

//Bring in environment variable for port
const dotenv = require('dotenv');
dotenv.config();

//Set CORS (Cross Origin Requests) as use for cross port communication
//In order for us to process json from our req body we need a body parser
const cors = require('cors');
app.use(cors(), express.json());

//Bring in mongoose connection to the DataBase
const connectDb = require('./config/mongoose.config');
connectDb();

//Establish guild router
const guildRouter = require('./routes/guild.routes');
app.use('/api/guilds', guildRouter);

//Establish character router
const characterRouter = require('./routes/character.routes');
app.use('/api/characters', characterRouter);

//Establish user router
const userRouter = require('./routes/user.routes');
app.use('/api/users', userRouter);

//Use env variable for are port
const port = process.env.PORT || 8000;

//Call the listener method to establish a server
app.listen(port, () => console.log(`Listening on port: ${port}`));
