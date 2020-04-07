import { Component, OnInit, Inject} from '@angular/core';
import { Expense } from "../../models/expense";
import { ExpenseService } from "../../services/expense.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'util';


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
    if(!isNullOrUndefined(this.data.index))
    {
      console.log(this.expenseService.expenses[this.data.index]);
      this.formDataExpense = Object.assign({}, this.expenseService.expenses[this.data.index]);
    }

  }

  close()
  {
    this.dialogRef.close();
  }

  onSubmit(form:NgForm){
    console.log(form.value);
    if(!isNullOrUndefined(this.data.index))
    {
        this.expenseService.updateExpense(this.formDataExpense)
          .subscribe((items) => {
            this.formDataExpense = items;
          });
        this.flashMessages.show("Update success!", {cssClass: 'alert-success', timeout:3000});
    }
    else {
      this.expenseService.addExpense(form.value);
      this.flashMessages.show("Add success!", {cssClass: 'alert-success', timeout:3000})
      } 
    console.log("After Save");
    console.log(this.formDataExpense);
   
    this.close();

}


}

