const Expense = require('../Models/Expense');
const router = require("express").Router();

router.post('/', async (req, res) => {
    const expense = new Expense({
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        category: req.body.category,
    });
    try {
        const newExpense = await expense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/del/:id', getExpense, async (req, res) => {
    try {
        await res.expense.remove();
        res.json({ message: 'Deleted Expense' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getExpense(req, res, next) {
    let expense;
    try {
        expense = await Expense.findById(req.params.id);
        if (expense == null) {
            return res.status(404).json({ message: 'Cannot find expense' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.expense = expense;
    next();
}
module.exports = router;