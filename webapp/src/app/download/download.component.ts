import { Component, OnInit } from '@angular/core';

import { ExpenseService } from '../services/expense.service';
import { Expense } from 'src/app/models/expense';
import * as XLSX from 'xlsx';



@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  /*name of the excel-file which will be downloaded. */ 
/*name of the excel-file which will be downloaded. */ 
fileName= 'Expenses.xlsx';  

  constructor() { }

  exportexcel(): void {
    /* table id is passed over here */   
    let element = document.getElementById('expense'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  } 
}
