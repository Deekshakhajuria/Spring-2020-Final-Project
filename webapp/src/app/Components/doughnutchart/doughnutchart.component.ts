import { Component, OnInit } from '@angular/core';
import { IncomeService } from 'src/app/services/income.service';
import { Income } from 'src/app/models/income';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doughnutchart',
  templateUrl: './doughnutchart.component.html',
  styleUrls: ['./doughnutchart.component.scss']
})
export class DoughnutchartComponent implements OnInit {
  
  data: IncomeService[];  
  Category = ["Salary","Investment Income","Bonus","Refund","Side Money","Loan","Other"];  
  Amount = [0,0,0,0,0,0,0];  
  currentCategory: any;
  currentamount: number;
  currentDate: any;
  chart : any;  
  constructor(private incomeService: IncomeService ) {}

  ngOnInit(): void {
    this.incomeService.getAllIncome().subscribe(result => {  
      result.forEach(x => {
        
        this.currentCategory = new String(x.category);  
        this.currentamount = x.amount;
        // since Amount is an array which needs to set as the related tag names.
        if(this.currentCategory == "Salary"){
          this.Amount[0] += this.currentamount;
        }else if(this.currentCategory == "Investment Income"){
          this.Amount[1] += this.currentamount;
        }
        else if(this.currentCategory == "Bonus"){
          this.Amount[2] += this.currentamount;
        }
        else if(this.currentCategory == "Refund"){
          this.Amount[3] += this.currentamount;
        }
        else if(this.currentCategory == "Side Money"){
          this.Amount[4] += this.currentamount;
        }
        else if(this.currentCategory == "Other"){
          this.Amount[6] += this.currentamount;
        }else{
          this.Amount[5] += this.currentamount;
        }
      });  


     this.chart = new Chart('canvas3', {  
        type: 'doughnut',  
        data: {  
          labels: this.Category,  // passing through the array for labels
          datasets: [  
            {  
              data: this.Amount,  //passing through the data for amounts
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
              fill: true  
            }  
          ]  
        },  
        options: {
          // for setting up titles
          title:{
            display:true,
            text:'Income Category',
            fontSize:20,
          },
          legend: {  
            display: true 
          },  
          //for scales
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: false  
            }],  
          },
          responsive:true,
          maintainAspectRatio: true,
          aspectRatio:1,// maintain the same scale
          // layout:{
          //   padding:{
          //     left:150,
          //   }
          // }
        }  
      });  
    });  
  }

}
