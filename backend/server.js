require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB URI (ensure %23 is used instead of # in the password)
const uri = process.env.ATLAS_URI;

// Connect to MongoDB using Mongoose without deprecated options
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running on: ${port}`);
});
