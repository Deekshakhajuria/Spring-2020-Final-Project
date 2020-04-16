// Define the income item model
export class Income {
    _id: string;
    description: string;
    amount: number;
    Date: Date;
    category: string;
    constructor() {
        this.description = "";
        this.amount = null;
        this.Date = new Date();
        this.category = "";
    }
}