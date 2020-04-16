const mongoose = require('mongoose');
const config = require('../config/database');
const Schema = mongoose.Schema;

// Define the income item model

const IncomeSchema = new Schema({
    description: {
        type: String,
        required:"Income Description is missing"
    },
    amount: {
        type: Number,
        required: "Income amount is missing"
    },
    Date: {
        type: Date,
        required:"Date is missing"
    },
    category: {
        type: String,
        required: "Income Category is missing"
    }
},
{
    versionKey: false,
});

IncomeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
IncomeSchema.set('toJSON', {
    virtuals: true
});
module.exports = mongoose.model('Income', IncomeSchema);