// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user=require('./src/User')
const expense=require('./src/Expense')
const app = express();


app.use(express.json())
app.use(cors());

mongoose.connect('mongodb+srv://Sirjan:Sirjan@demo.eekxi.mongodb.net/expenseTracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use('/api/', user);
app.use('/api/expenses', expense); 


app.get('/', (req, res) => {
    res.send('Expense Tracker API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
