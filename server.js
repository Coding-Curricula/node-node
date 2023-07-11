const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = 8080;

app.use(express.json());

const TODOS = [
    { id: 1, title: 'Todo 1', completed: false },
    { id: 2, title: 'Todo 2', completed: false },
    { id: 3, title: 'Todo 3', completed: false },
];

app.get('/', (req, res) => {
    res.send('Hello team UN');
});

// RETURN values http://localhost:8080/?year=request&month=response
app.get('/date', (req, res) => {
    let q = req.query;
    let txt = q.year + " " + q.month;
    res.send(txt);
});

// CREATE A NEW TODO
app.post('/todos', (req, res) => {
    const newTodo = {
        id: TODOS.length + 1,
        title: req.body.title,
        completed: false,
    }

    TODOS.push(newTodo);

    console.log(TODOS);

    res.send(TODOS);
});

// GET ALL TODOS
app.get('/todos', (req, res) => {
    res.send(TODOS);
});

// GET A SINGLE TODO by id
app.get('/todos/:id', (req, res) => {
    const todo = TODOS.find((todo) => todo.id === parseInt(req.params.id));

    if (!todo) {
        res.status(404).send('Todo not found');
    }

    res.send(todo);
});

// UPDATE A TODO by id
app.put('/todos/:id', (req, res) => {
    const todo = TODOS.find((todo) => todo.id === parseInt(req.params.id));

    if (!todo) {
        res.status(404).send('Todo not found');
    }

    todo.title = req.body.title;

    res.send(todo);
});

// DELETE A TODO by id
app.delete('/todos/:id', (req, res) => {
    const todo = TODOS.find((todo) => todo.id === parseInt(req.params.id));

    if (!todo) {
        res.status(404).send('Todo not found');
    }

    const index = TODOS.indexOf(todo);
    TODOS.splice(index, 1);

    res.send(todo);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});