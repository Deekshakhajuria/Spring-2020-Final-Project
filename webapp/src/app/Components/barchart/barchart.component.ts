import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from 'src/app/models/expense';
import { Income } from 'src/app/models/income';
import { IncomeService } from 'src/app/services/income.service';



// var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ocotober', 'Novemeber', 'December'];


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})


export class BarchartComponent implements OnInit {
  // data: ExpenseService[];
  // data2: IncomeService[];

  expenses: Expense[];
  income: Income[];

  // Months = [];
  Amount = [null, null, null, null, null, null, null, null, null, null, null, null];

  Amount2 = [null, null, null, null, null, null, null, null, null, null, null, null];

  currentDate: any;
  barchart1: any;
  currentamount: number;
  currentamount2: number;

  lessThanOrGreaterThan = 'lessThan';
  filterLimit = 100;
  from = '0';
  toMonth = '12';

  constructor(private expenseService: ExpenseService, private incomeService: IncomeService) { }

  ngOnInit() {
    this.incomeService.getAllIncome().subscribe(result => {
      result.forEach(y => {
        this.currentDate = new Date(y.Date);    // import Date from database)
        this.currentamount2 = y.amount;          // create a currentamount array for import amount
        this.Amount2[this.currentDate.getMonth()] += this.currentamount2;// push amount into bar chart with related month
      });
    })// for income part bar
    this.expenseService.getAllExpense().subscribe(result => {
      result.forEach(x => {
        this.currentDate = new Date(x.Date);    // import Date from database)
        this.currentamount = x.amount;          // create a currentamount array for import amount
        this.Amount[this.currentDate.getMonth()] += this.currentamount;// push amount into bar chart with related month
      });
      //for Expense part bar
      var Expense_Part = {
        data: this.Amount,
        label: 'Expense',
        // yAxisID: 'y-axis-1',
        borderColor: '#3cba9f',
        backgroundColor: [ //background color code for 12 bars
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
          'rgba(255, 153, 51, 1)',
        ],
        barPercentage: 0.1,
        barThickness: 30,
        maxBarThickness: 50,
        minBarLength: 2,
        fill: true,
      }
      // for Income part bar
      var Income_Part = {
        data: this.Amount2,
        label: 'Income',
        // yAxisID: 'y-axis-2',
        borderColor: '#3cba9f',
        backgroundColor: [ //background color code for 12 bars
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
          'rgba(50, 205, 50, 1)',
        ],
        barPercentage: 0.1,
        barThickness: 30,
        maxBarThickness: 50,
        minBarLength: 2,
        fill: true,
      }
      // union Income and Expense together
      var Together = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [Expense_Part, Income_Part]
      }

      // need to use this data Together otherwise those two bar will Stack together
      this.barchart1 = new Chart('canvas1', {
        type: 'bar',   //chart type
        data: Together,
        options: {
          responsive: true,
          title: {
            display: true,
            text: 'Expense/Income Barchart',
            fontSize: 20,
          }
        }
      });
      
    });
  };
}

//picker











