import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./expense.css";
import { useUser } from '../UserProvider';
import {  useNavigate } from 'react-router-dom';

function Expenses() {
  const { user } = useUser();
  console.log(user?.user)
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const Navigate=useNavigate()

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpenses(response.data);
      } catch (error) {
        console.log('Error fetching expenses');
      }
    };
    fetchExpenses();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!user?.user){
      Navigate("/login")
    }
    try {
      const postData = {
        name,
        amount,
        date
      };
      const response = await axios.post('http://localhost:5000/api/expenses', postData);
      setExpenses([...expenses, {...response.data}]);
      setName('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('Error adding expense');
    }
  };

  const currentMonthTotal = expenses.reduce((total, expense) => {
    const expenseDate = new Date(expense.date);
    const currentDate = new Date();
    if (expenseDate.getMonth() === currentDate.getMonth() &&
        expenseDate.getFullYear() === currentDate.getFullYear()) {
      return total + parseFloat(expense.amount);
    }
    return total;
  }, 0);

  return (
    <div className="expenses-container">
      <div className="expense-form">
        <h2>Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            placeholder="Expense Name" 
            required 
          />
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount" 
            required 
          />
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required 
          />
          <button type="submit">Add Expense</button>
        </form>
      </div>
      <div className="expense-list">
        <h2>Expenses</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense._id}>
                <td>{expense.name}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.amount}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total for Current Month:</td>
              <td>${currentMonthTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default Expenses;
