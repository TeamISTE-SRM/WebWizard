const mongoose = require("mongoose");
const User = require("../models/User");

const login = async (req, res) => {
	const { email, password } = req.body;
	console.log("req found");
	try {
		const user = await User.findOne({ email });
		console.log(user);
		if ((user.password === password)) {
			res.status(200).json(user);
		} else {
			res.status(401).json({ message: "wrong password" });
		}
	} catch (err) {
		res.status(404).json(err);
	}
};

const signup = async (req, res) => {
	const { username, email, password } = req.body;
	const user = await User.findOne({ email: email });
	if (user) {
		return res
			.status(401)
			.json({ error: "User with that email already exists" });
	}
	try {
		const user = await User.create({
			username,
			email,
			password,
		});
        console.log(user);
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json(err);
	}
};

module.exports = { login,signup}