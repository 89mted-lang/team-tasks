const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// ���������� ����� �� ����� public
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=UTF-8');
  next();
});

// ���� ���-�� ������� �� ���� � ���������� public/index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});