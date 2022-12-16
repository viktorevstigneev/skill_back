const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	name: {
		type: String,
	},
	surname: {
		type: String,
	},
	username: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	avatar: {
		type: String,
		default: 'default.png',
	},
	test_one: {
		type: Number,
		default: 0,
	},
	test_two: {
		type: Number,
		default: 0,
	},
	test_third: {
		type: Number,
		default: 0,
	},
});

const User = model('User', UserSchema);

const createUser = (data) => {
	return User.create(data);
};

const getUser = (id) => {
	return User.findOne({ _id: id });
};

const deleteUser = (id) => {
	return User.deleteOne({ _id: id });
};

const updateUser = (id, data) => {
	return User.updateOne({ _id: id }, { ...data });
};

module.exports = {
	createUser,
	getUser,
	deleteUser,
	updateUser,
	User,
};
