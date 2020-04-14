import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { Expense } from "../../models/expense";
import { ExpenseService } from "../../services/expense.service";
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseItemComponent } from "../expense-item/expense-item.component";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  expenses: Expense[];
  public newExpense: Expense = new Expense();

  constructor(
    private expenseService: ExpenseService,
    private dialog : MatDialog,
    private toastr: ToastrService) { }

  // List all added expense item
  ngOnInit(): void {
    this.expenseService.getAllExpense().subscribe(items => {
      this.expenses = items;
    });
  }

  // Delete current expense item
  delete(expense: Expense): void {
    this.expenses = this.expenses.filter(h => h !== expense);
    this.expenseService.deleteExpense(expense).subscribe();
    this.toastr.success("Item Delete Success!","Expense Delete",{
      timeOut:2000
    });
  }

  // Enable matdialog, user expense item index ad input data.
  add(index: number){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = {
          index 
        };
        this.dialog.open(ExpenseItemComponent,dialogConfig);
        this.dialog.afterAllClosed.subscribe(() => {
          this.ngOnInit();
        })
  }

  // Check the list 
  isDataEmpty(): boolean {
    return this.expenses.length === 0;
  }
}


