const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const ATLAS_URL = process.env.ATLAS_URL;

mongoose.connect(ATLAS_URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
})

const connection = mongoose.connection;
connection.once('open', () => {
	console.log('mongoDB Connected');
})

app.use('/api/employees', require('./routes/employees'));

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));