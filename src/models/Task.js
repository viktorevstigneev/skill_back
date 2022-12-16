const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
	},
	priority: {
		type: String,
		enum: ['Low', 'Normal', 'High'],
	},
	status: {
		type: String,
		enum: ['TO_DO', 'IN_PROGRESS', 'DONE'],
	},
	rewardId: [{ type: Schema.Types.ObjectId, ref: 'Reward' }],
	subTasks: [{ type: Schema.Types.ObjectId, ref: 'SubTask' }],
});

const Task = model('Task', TaskSchema);

const createTask = (data) => {
	return Task.create(data);
};

const getTask = (id) => {
	return Task.findOne({ _id: id });
};

const getAllTasks = () => {
	return Task.find({});
};

const deleteTask = (id) => {
	return Task.deleteOne({ _id: id });
};

const updateTask = (id, data) => {
	return Task.updateOne({ _id: id }, { ...data });
};

module.exports = {
	createTask,
	getTask,
	getAllTasks,
	deleteTask,
	updateTask,
	Task,
};
