const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Показывать файлы из папки public
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  next();
});

// Если кто-то Заходит на сайт - показывать public/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(10000, () => console.log('Server started on 10000'));
const fs = require('fs');
const TASKS_FILE = path.join(__dirname, 'tasks.json');

// Получить все задачи
app.get('/api/tasks', (req, res) => {
  fs.readFile(TASKS_FILE, 'utf8', (err, data) => {
    if (err) return res.json([]);
    res.json(JSON.parse(data));
  });
});

// Добавить новую задачу
app.post('/api/tasks', express.json(), (req, res) => {
  fs.readFile(TASKS_FILE, 'utf8', (err, data) => {
    let tasks = [];
    if (!err && data) tasks = JSON.parse(data);
    const newTask = req.body;
    newTask.id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.push(newTask);
    fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2), () => {
      res.json(newTask);
    });
  });
});