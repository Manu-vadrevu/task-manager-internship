const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let tasks = [
    { id: 1, text: "Review technical architecture plan" },
    { id: 2, text: "Optimize UI responsiveness for mobile screens" }
];

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        text: req.body.text
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: "Task removed successfully" });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Task Manager backend running on port ${PORT}`);
});
