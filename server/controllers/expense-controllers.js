'use strict';

const expenseService = require('../services/expense-service');

exports.list = (request, response) => {
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