import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import {Chart } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
})
export class PiechartComponent implements OnInit {

  data: ExpenseService[];  
  Category = [];  
  Amount = [];  
  chart : any;  
  constructor(private expenseService: ExpenseService) { } 
  
   ngOnInit() {  
    this.expenseService.getAllExpense().subscribe(result => {  
      result.forEach(x => {    
        this.Category.push(x.category);  
        this.Amount.push(x.amount);  
      });  
     this.chart = new Chart('canvas', {  
        type: 'pie',  
        data: {  
          labels: this.Category,  
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
            display: true  
          },  
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: false  
            }],  
          }  
        }  
      });  
    });  
  }
}