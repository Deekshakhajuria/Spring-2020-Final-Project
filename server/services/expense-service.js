'use strict';
const mongoose = require('mongoose'),
    Expense = mongoose.model('Expense');

/**
 * Return promises for search results
 * @param params
 */
exports.search = (params) => {
    const promise = Expense.find(params).exec();
    return promise;
}; 

/**
 * Save the new created expense object
 * 
 * @param expense
 */
exports.save = (expense) => {
    const newExpense = new Expense(expense);
    return newExpense.save();
};

/**
 * Return object by id
 * 
 * @param id
 */
exports.get = (id) => {
    const expensePromise = Expense.findById(id).exec();
    return expensePromise;
};

/**
 * Update resource
 * 
 * @param updatedExpense
 */
exports.update = (updatedExpense) => {
    const promise = Expense.findByIdAndUpdate(updatedExpense.id, updatedExpense).exec();
    return promise;
};

/**
 * Delete an existing expense item
 * 
 * @param id
 */

exports.delete = (id) => {
    const promise = Expense.findByIdAndRemove(id).exec();
    return promise;
};
