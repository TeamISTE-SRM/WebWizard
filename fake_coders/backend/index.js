const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const { login, signup } = require('./controllers/userController');



const app = express();
app.use(express.json());
app.use(cors());

app.post('/login',login)
app.post('/signup',signup)


mongoose
	.connect(process.env.DB_URI)
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("listening on 4000");
		});
	})
	.catch((err) => {
		console.log(err);
	});