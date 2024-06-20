const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const authMiddleware = require('../middleware/authMiddleware');

// Reference to Firestore
const db = admin.firestore();
const tasksCollection = db.collection('tasks');

// Create a new task
router.post('/create', authMiddleware, async (req, res) => {
    const { title, category } = req.body;
    const userId = req.user.uid;

    try {
        const newTask = {
            title,
            category,
            userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        };
        const taskDoc = await tasksCollection.add(newTask);
        res.status(201).send({ message: 'Task created successfully', taskId: taskDoc.id });
    } catch (error) {
        res.status(400).send({ message: 'Error creating task', error: error.message });
    }
});

// Fetch all tasks for the authenticated user
router.get('/tasks', authMiddleware, async (req, res) => {
    const userId = req.user.uid;

    try {
        const tasksSnapshot = await tasksCollection.where('userId', '==', userId).get();
        const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching tasks', error: error.message });
    }
});

// Update a task
router.put('/update/:id', authMiddleware, async (req, res) => {
    const taskId = req.params.id;
    const { title, category } = req.body;
    const userId = req.user.uid;

    try {
        const taskDoc = await tasksCollection.doc(taskId).get();
        if (!taskDoc.exists || taskDoc.data().userId !== userId) {
            return res.status(404).send({ message: 'Task not found or unauthorized' });
        }
        
        await tasksCollection.doc(taskId).update({ title, category });
        res.send({ message: 'Task updated successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error updating task', error: error.message });
    }
});

// Delete a task
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.uid;

    try {
        const taskDoc = await tasksCollection.doc(taskId).get();
        if (!taskDoc.exists || taskDoc.data().userId !== userId) {
            return res.status(404).send({ message: 'Task not found or unauthorized' });
        }

        await tasksCollection.doc(taskId).delete();
        res.send({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).send({ message: 'Error deleting task', error: error.message });
    }
});

module.exports = router;
