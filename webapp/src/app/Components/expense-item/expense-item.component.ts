import { Component, OnInit, Inject} from '@angular/core';
import { Expense } from "../../models/expense";
import { ExpenseService } from "../../services/expense.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})
export class ExpenseItemComponent implements OnInit {
  formDataExpense : Expense = new Expense();
  expenses: Expense[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<ExpenseItemComponent>,
    private expenseService : ExpenseService,
    private flashMessages: FlashMessagesService 
  ) { }

  ngOnInit(): void {
    this.formDataExpense = Object.assign({},this.expenses[this.data.index])
  }

  close()
  {
    this.dialogRef.close();
  }

}

