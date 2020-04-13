import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { LabelOptions } from '@angular/material/core';
import { Expense } from 'src/app/models/expense';
import { months } from 'moment';


// var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ocotober', 'Novemeber', 'December'];


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html'
})


export class BarchartComponent implements OnInit {
  data: ExpenseService[];
  expenses: Expense[];
  Months = [];
  Amount = [];
  date: Date;
  barchart: any;
  constructor(private expenseService: ExpenseService) { }


  ngOnInit() {
    this.expenseService.getAllExpense().subscribe(result => {
      result.forEach(x => {
        const currentDate = new Date(x.Date);
        this.Months.push(currentDate.getMonth() + 1);
        this.Amount.push(x.amount);
        // for (let i = 1; i < 6; i ++)
        // this.Months.push(currentDate.getMonth()+ i);
        // this.Amount.push(x.amount);
        // console.log(currentDate.getMonth()+1);
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
