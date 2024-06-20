const admin = require('firebase-admin');
const db = admin.firestore();

const getTasks = async (userId) => {
  const tasksSnapshot = await db.collection('tasks').where('userId', '==', userId).get();
  return tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const addTask = async (task) => {
  const taskRef = await db.collection('tasks').add(task);
  return taskRef.id;
};

const deleteTask = async (taskId) => {
  await db.collection('tasks').doc(taskId).delete();
};

module.exports = {
  getTasks,
  addTask,
  deleteTask
};
