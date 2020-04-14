'use strict';

const expenseService = require('../services/expense-service');

/**
 * Set response for expense item search.
 * 
 * @param request
 * @param response
 */
exports.list = (request, response) => {
    // Enable search by category
    const categoryQuery = request.query.category;
    const params = {};
    if(categoryQuery) {
        params.category = categoryQuery 
    };
    const promise = expenseService.search(params);
    const result = (items)=> {
        response.status(200);
        response.json(items);
    };
    promise
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Create new expense items and set the response.
 * 
 * @param request
 * @param response
 */
exports.save = (request, response) => {
    const item = Object.assign({}, request.body);
    const result = (saveItem) => {
        response.status(201);
        response.json(saveItem);
    };
    const promise = expenseService.save(item);
    promise 
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Get expense list item response.
 * 
 * @param request
 * @param response
 */
exports.get = (request, response) => {
    const itemId = request.params.id;
    const result = (item) => {
        response.status(200);
        response.json(item);
    };
    const promise = expenseService.get(itemId);
    promise 
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Update expesne item resources
 * 
 * @param request
 * @param response
 */

exports.update = (request, response) => {
    const itemId = request.params.id;
    const updatedItem = Object.assign({}, request.body);
    updatedItem.id = itemId;
    const result = (item) => {
        response.status(200);
        response.json(item);
    };
    const promise = expenseService.update(updatedItem);
    promise 
        .then(result)
        .catch(renderErrorResponse(response));
};

/**
 * Delete an expense item resource.
 * 
 * @param request
 * @param response
 */
exports.delete = (request, response) => {
    const itemId = request.params.id;
    const result = () => {
        response.status(200);
        response.json({
            message:"Delete successful!"
        });
    };
    const promise = expenseService.delete(itemId);
    promise 
        .then(result)
        .catch(renderErrorResponse(response));
};
/**
 * Error handle function
 * 
 * @param {Response} response response object
 * @param {Function} function error handle function
 */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if(error) {
            response.status(500);
            response.json({
                message:error.message
            });
        }
    };
    return errorCallback;
};