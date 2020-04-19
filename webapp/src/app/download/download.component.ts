import { Component, OnInit } from '@angular/core';
import { AppService } from "../services/downloadfile.service";
import { ExpenseService } from '../services/expense.service';
import { Expense } from 'src/app/models/expense';


@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit(): void {
  }
  jsonData =  [
    
  ];

download(){
  this.appService.downloadFile(this.jsonData, 'jsontocsv');
}
  
}
