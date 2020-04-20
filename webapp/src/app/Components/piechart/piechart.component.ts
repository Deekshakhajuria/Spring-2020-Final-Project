import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Chart } from 'chart.js';
import { Expense } from 'src/app/models/expense';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
})
export class PiechartComponent implements OnInit {

  // data: ExpenseService[];  
  Category = ["Travel","Shopping","Rent","Dining","Medicial","Mobile/Internet bill","Other"];  
  Amount = [0,0,0,0,0,0,0];  
  currentCategory: any;
  currentamount: number;
  currentDate: any;
  chart : any;  

  constructor(private expenseService: ExpenseService) { } 
  
   ngOnInit() {  
    this.expenseService.getAllExpense().subscribe(result => {  
      result.forEach(x => {
        //get all expenses from the backend
        this.currentCategory = new String(x.category);  
        this.currentamount = x.amount;
        // since Amount is an array which needs to set as the related tag names.
        if(this.currentCategory == "Travel"){
          this.Amount[0] += this.currentamount;
        }else if(this.currentCategory == "Shopping"){
          this.Amount[1] += this.currentamount;
        }
        else if(this.currentCategory == "Rent"){
          this.Amount[2] += this.currentamount;
        }
        else if(this.currentCategory == "Dining"){
          this.Amount[3] += this.currentamount;
        }
        else if(this.currentCategory == "Medicial"){
          this.Amount[4] += this.currentamount;
        }
        else if(this.currentCategory == "Other"){
          this.Amount[6] += this.currentamount;
        }else{
          this.Amount[5] += this.currentamount;
        }
      });  


     this.chart = new Chart('canvas', {  
        type: 'pie',  
        data: {  
          labels: this.Category,  // passing through the category
          datasets: [  
            {  
              data: this.Amount,  
              borderColor: 'rgba(0, 0, 0, 0)',  
              backgroundColor: [  
                'rgba(255, 99, 132, 1)', //1
                'rgba(54, 162, 235, 1)', //2
                'rgba(255, 206, 86, 1)', //3
                'rgba(75, 192, 192, 1)', //4
                'rgba(153, 102, 255, 1)', //5
                'rgba(255, 159, 64, 1)', //6
                'rgba(215, 129, 233, 1)', //7
              ],  
              // borderWidth:[6,6,6,6,6,6,6],
              fill: true  
            }  
          ]  
        },  
        options: {
          title:{
            display:true,
            text:'Expense Category',
            fontSize:20,
          },
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
          },
          // elements:{
          //   arc:{
          //     borderWidth:5,
          //     borderColor: '#FFFFFF',
          //   }
          // },
          responsive:true,
          maintainAspectRatio: true,
          aspectRatio:1
        }  
      });  
    });  
  }
}