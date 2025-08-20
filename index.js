const express = require('express');
const app = express();
const Database = require("@replit/database");
const db = new Database();

app.use(express.json());
app.use(express.static('public'));

// Получить все задачи
app.get('/api/tasks', async (req, res) => {
  const tasks = await db.get("tasks") || [];
  res.json(tasks);
});

// Добавить задачу
app.post('/api/tasks', async (req, res) => {
  const tasks = await db.get("tasks") || [];
  const newTask = { ...req.body, id: Date.now() };
  tasks.push(newTask);
  await db.set("tasks", tasks);
  res.json(newTask);
});

// Удалить задачу
app.delete('/api/tasks/:id', async (req, res) => {
  let tasks = await db.get("tasks") || [];
  tasks = tasks.filter(t => t.id != req.params.id);
  await db.set("tasks", tasks);
  res.sendStatus(204);
});

// Редактировать задачу
app.put('/api/tasks/:id', async (req, res) => {
  let tasks = await db.get("tasks") || [];
  tasks = tasks.map(t => t.id == req.params.id ? { ...t, ...req.body } : t);
  await db.set("tasks", tasks);
  res.json(tasks.find(t => t.id == req.params.id));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server started on ' + PORT));