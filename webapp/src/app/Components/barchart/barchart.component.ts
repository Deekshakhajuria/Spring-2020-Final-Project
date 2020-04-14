import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { LabelOptions } from '@angular/material/core';
import { Expense } from 'src/app/models/expense';
import { months } from 'moment';


// var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ocotober', 'Novemeber', 'December'];


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html'
})


export class BarchartComponent implements OnInit {
  data: ExpenseService[];
  expenses: Expense[];
  Months = [];
  Amount = [];
  monthSummary = [];
  date: Date;
  currentDate : any;
  barchart: any;
  monthSum = 0;
  currentamount:number;
  constructor(private expenseService: ExpenseService) { }
  
  

  ngOnInit() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.expenseService.getAllExpense().subscribe(result => {
      result.forEach(x => {
        this.currentDate = new Date(x.Date);
        this.currentamount = x.amount;
        this.monthSum += this.currentamount;
        this.Amount[this.currentDate.getMonth()]= this.monthSum[this.currentDate.getMonth()];
      });
      
      // this.expenseService.getAllExpense().subscribe(item => {
      //   this.expenses = item;
      //   console.log(this.expenses)
      //   // this.Months.push(this.expenses)
      // })
      // for (const expense in this.expenses) { 
      //   const currentDate = new Date(expense.Date);
      //   this.Months.push(currentDate.getMonth());
      //   this.Amount.push(expense.amount)
      // }
      this.barchart = new Chart('canvas1', {
        type: 'bar',
        data: {
          // labels: this.monthSummary,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              data: this.Amount,
              borderColor: '#3cba9f',
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "Blue",
                "Red",
                "Blue"
              ],
              fill: true
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      });
    });
  }
}
