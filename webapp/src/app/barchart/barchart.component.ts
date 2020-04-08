import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { ExpenseService } from '../services/expense.service';



@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
})
export class BarchartComponent implements OnInit {

  data: ExpenseService[];  
  Months = [];  
  Amount = [];  
  barchart = [];  
  constructor(private expenseService: ExpenseService) { }

  
  ngOnInit() {  
    this.expenseService.getAllExpense().subscribe(result => {  
      result.forEach(x => {  
        this.Months.push(x.Date);  
        this.Amount.push(x.amount);  
      });  
      this  
      this.barchart = new Chart('canvas1', {  
        type: 'bar',  
        data: {  
          labels: this.Months,  
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