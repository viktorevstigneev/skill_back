const { HttpStatusCode } = require('../constants');
const { createTask, getTask, getAllTasks, deleteTask, updateTask } = require('../models/Task');
const { createSubTask } = require('../models/SubTask');
const { addUserTask } = require('../models/UserTasks');

const handleAddTask = async (req, res) => {
	try {
		const { name, description, userId, subtasks } = req.body;

		const subtasksIdArray = await JSON.parse(subtasks).map(async (element) => {
			console.log('element: ', element);
			const subtask = await createSubTask(element);

			const subTaskData = subtask.toObject();

			return subTaskData._id;
		});
		console.log('subtasksIdArray: ', subtasksIdArray);

		const result = await createTask({ name, description, image: req.file.filename, subTasks: subtasksIdArray });
		await addUserTask({ userId, taskId: result.id });

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		console.log('error: ', error);
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetTask = async (req, res) => {
	try {
		const result = await getTask(req.params.id);
		tujrthr;
		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleGetAllTasks = async (req, res) => {
	try {
		const result = await getAllTasks();

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleDeleteTask = async (req, res) => {
	try {
		const result = await deleteTask(req.body.id);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

const handleUpdateTask = async (req, res) => {
	try {
		const result = await updateTask(req.body.id, req.body);

		res.status(HttpStatusCode.OK).send(result);
	} catch (error) {
		res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error });
	}
};

module.exports = {
	handleAddTask,
	handleGetTask,
	handleGetAllTasks,
	handleDeleteTask,
	handleUpdateTask,
};
