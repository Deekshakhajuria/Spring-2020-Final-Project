const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

// Define the expense item model

const ExpenseSchema = new Schema({
    description: {
        type: String,
        required:"Expense Description is missing"
    },
    amount: {
        type: Number,
        required: "Expense amount is missing"
    },
    Date: {
        type: Date,
        required:"Date is missing"
    },
    category: {
        type: String,
        required: "Expense Category is missing"
    }
},
{
    versionKey: false,
});

ExpenseSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
ExpenseSchema.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Expense', ExpenseSchema);

