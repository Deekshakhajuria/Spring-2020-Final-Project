import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { Expense } from 'src/app/models/expense';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-download-income',
  templateUrl: './download-income.component.html',
  styleUrls: ['./download-income.component.scss']
})
export class DownloadIncomeComponent {
/*name of the excel-file which will be downloaded. */ 
/*name of the excel-file which will be downloaded. */ 
fileName= 'Income.xlsx';  

  constructor() { }

  exportexcel(): void {
    /* table id is passed over here */   
    let element = document.getElementById('income'); 
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  } 
}
