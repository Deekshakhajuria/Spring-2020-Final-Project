import { Component, OnInit, Inject, Input} from '@angular/core';
import { Expense } from "../../models/expense";
import { ExpenseService } from "../../services/expense.service";
// import { FlashMessagesService } from 'angular2-flash-messages';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgForm } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-expense-item',
  templateUrl: './expense-item.component.html',
  styleUrls: ['./expense-item.component.scss']
})

export class ExpenseItemComponent implements OnInit {
  formDataExpense : Expense = new Expense();
  public key: any;
  public expenses: any[] = [];
  // @Input() expenses: Expense;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<ExpenseItemComponent>,
    private expenseService : ExpenseService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(!isNullOrUndefined(this.data.index))
    {
      // console.log(this.expenseService.expenses[this.data.index]);
      this.formDataExpense = Object.assign({}, this.expenseService.expenses[this.data.index]);
      this.expenseService.getAllExpense().subscribe((response) => {
        this.expenses = response;
        // console.log(this.expenses);
      })
 
    }
  }
  // update(index: string){
  //   const id = this.expenses[index]._id;
  //   this.expenseService.updateExpense(index, this.formDataExpense);
  // }

  close()
  {
    this.dialogRef.close();
  }

  onSubmit(form:NgForm){
    // console.log(form.value);
    // console.log(this.data.index)

    if(!isNullOrUndefined(this.data.index))
    {   
        const id = this.expenses[this.data.index]._id;
        console.log(id);
        // if the expense item index exists, update the chosen expense item.
        this.expenseService.updateExpense(id, form.value).subscribe();
        this.toastr.success("Item update success!", "Expense Update",{
          timeOut:2000
        } );
    }
    // Else add new expense item.
    else {
      this.expenseService.addExpense(form.value);
      this.toastr.success("Item add success!","Expense Add ",{
        timeOut:2000
      })
      }
    
    console.log("After Save");
    // console.log(this.formDataExpense);
   
    // After submit, close the dialog.
    this.close();

}


}

