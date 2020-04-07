import { Component, OnInit } from '@angular/core';
import { Expense } from "../../models/expense";
import { ExpenseService } from "../../services/expense.service";
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseItemComponent } from "../expense-item/expense-item.component";


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
    private dialog : MatDialog) { }

  ngOnInit(): void {
    this.expenseService.getAllExpense().subscribe(items => {
      this.expenses = items;
    });
  }

  delete(expense: Expense): void {
    this.expenses = this.expenses.filter(h => h !== expense);
    this.expenseService.deleteExpense(expense).subscribe();
  }

  add(index: number){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = {
          index 
        };
        this.dialog.open(ExpenseItemComponent,dialogConfig)
  }


  

}

