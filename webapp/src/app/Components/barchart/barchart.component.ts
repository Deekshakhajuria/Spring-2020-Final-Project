import { Component, OnInit,Input } from '@angular/core';
import {Chart} from 'chart.js';
import { ExpenseService } from '../../services/expense.service';
import { LabelOptions } from '@angular/material/core';


var MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Ocotober', 'Novemeber' , 'December'];


@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
})


export class BarchartComponent implements OnInit {
  data: ExpenseService[];  
  Months = [];  
  Amount = [];  
  barchart = [];  
  monthSummary =[];
  currentDate: any;
  currentamount:number;
  monthSum = 0;
  constructor(private expenseService: ExpenseService) { }

  
  ngOnInit() {  
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.expenseService.getAllExpense().subscribe(result => {  
      result.forEach(x => {  
        // this.Months.push(x.Date);
        // this.Amount.push(x.amount);  
        this.currentDate = new Date(x.Date);
        this.currentamount = x.amount;
        if (this.currentDate.getMonth() == 2) {
          this.monthSum += this.currentamount;}
        console.log(this.currentDate.getFullYear())
        // console.log(currentDate.getMonth());
        });
        this.monthSummary.push({
          name: monthNames[2],
          y: parseFloat(this.monthSum.toFixed(2))
        })
        console.log(this.monthSummary);


        
      ;  
      this.barchart = new Chart('canvas1', {  
        type: 'bar', 
        data: {  
          labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],  
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