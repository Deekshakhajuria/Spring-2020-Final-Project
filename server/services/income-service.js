'use strict';
const mongoose = require('mongoose'),
    Income = mongoose.model('Income');

/**
 * Return promises for search results
 * @param params
 */
exports.search = (params) => {
    const promise = Income.find(params).exec();
    return promise;
}; 

/**
 * Save the new created income object
 * 
 * @param income
 */
exports.save = (income) => {
    const newIncome = new Income(income);
    return newIncome.save();
};

/**
 * Return object by id
 * 
 * @param id
 */
exports.get = (id) => {
    const incomePromise = Income.findById(id).exec();
    return incomePromise;
};

/**
 * Update resource
 * 
 * @param updatedIncome
 */
exports.update = (updatedIncome) => {
    const promise = Income.findByIdAndUpdate(updatedIncome.id, updatedIncome).exec();
    return promise;
};

/**
 * Delete an existing income item
 * 
 * @param id
 */

exports.delete = (id) => {
    const promise = Income.findByIdAndRemove(id).exec();
    return promise;
};