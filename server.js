const express = require('express');
const port = 2323;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let tasks = [];

app.get('/', (req, res) => {
    res.render('index', { tasks });
});

app.get('/add-task', (req, res) => {
    res.render('add-task', { editTask: null });
});

app.get('/edit/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    res.render('add-task', { editTask: task });
});

app.get('/delete/:id', (req, res) => {
    tasks = tasks.filter(t => t.id !== req.params.id);
    res.redirect('/');
});

app.post('/tasks', (req, res) => {
    tasks.push({
        ...req.body,
        id: String(Date.now()),
        completed: false
    });

    res.redirect('/');
});

app.post('/tasks/:id', (req, res) => {
    const { id } = req.params;

    tasks = tasks.map(t => (t.id === id ? { ...t, ...req.body, id } : t));

    res.redirect('/');
});

app.post('/tasks/:id/toggle', (req, res) => {
    const id = req.params.id;

    tasks = tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t));

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
