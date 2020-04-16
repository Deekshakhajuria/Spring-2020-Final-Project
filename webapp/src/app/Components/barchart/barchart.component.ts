import { Component, OnInit} from '@angular/core';
import { Chart } from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from 'src/app/models/expense';


// var Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ocotober', 'Novemeber', 'December'];


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})


export class BarchartComponent implements OnInit {
  data: ExpenseService[];
  expenses: Expense[];
  Months = [];
  Amount = [null,null,null,null,null,null,null,null,null,null,null,null];
  // date: Date;
  currentDate: any;
  barchart: any;
  currentamount: number;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {

    this.expenseService.getAllExpense().subscribe(result => {
      result.forEach(x => {
        this.currentDate = new Date(x.Date);    // import Date from database)
        this.currentamount = x.amount;          // create a currentamount array for import amount
        this.Amount[this.currentDate.getMonth()] += this.currentamount;// push amount into bar chart with related month
      });

      this.barchart = new Chart('canvas1', {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              data: this.Amount,
              borderColor: '#3cba9f',
              backgroundColor: [ //background color code for 12 bars
                'rgba(255, 99, 132, 1)', //1
                'rgba(54, 162, 235, 1)', //2
                'rgba(255, 206, 86, 1)', //3
                'rgba(75, 192, 192, 1)', //4
                'rgba(153, 102, 255, 1)', //5
                'rgba(255, 159, 64, 1)', //6
                'rgba(215, 129, 233, 1)', //7
                'rgba(175, 211, 86, 1)', //8
                'rgba(35, 92, 192, 1)', //9
                'rgba(125, 36, 76, 1)', //10
                'rgba(95, 122, 192, 1)', //11
                'rgba(175, 122, 162, 1)', //12
              ],
              barPercentage: 0.5,
              barThickness: 30,
              maxBarThickness: 50,
              minBarLength: 2,
              fill: true,
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              stacked: true,
              gridLines: {
                offsetGridLines: true
              },
              ticks:{
                maxRotation: 0, //make sure the Month label is in the right rotation.(default is 45 degree)
                minRotation: 0,
                padding: 10,

              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true,
                callback: function(value, index, values){
                  return "$" +value;// use call back function to make $ currency on Y axes
                }
              }
            }],

          }
        }
      });
    });
  }
}
