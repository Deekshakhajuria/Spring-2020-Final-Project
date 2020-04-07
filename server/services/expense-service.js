'use strict';
const mongoose = require('mongoose'),
    Expense = mongoose.model('Expense');

exports.search = (params) => {
    const promise = Expense.find(params).exec();
    return promise;
}; 

exports.save = (expense) => {
    const newExpense = new Expense(expense);
    return newExpense.save();
};

exports.get = (id) => {
    const expensePromise = Expense.findById(id).exec();
    return expensePromise;
};

exports.update = (updatedExpense) => {
    const promise = Expense.findByIdAndUpdate(updatedExpense.id, updatedExpense).exec();
    return promise;
};

exports.delete = (id) => {
    const promise = Expense.findByIdAndRemove(id).exec();
    return promise;
};
