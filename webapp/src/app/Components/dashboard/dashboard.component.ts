import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { Expense } from "../../models/expense";
import { ExpenseService } from "../../services/expense.service";
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExpenseItemComponent } from "../expense-item/expense-item.component";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('sorter', {static: true}) sort: MatSort;
  expenses: Expense[];
  public newExpense: Expense = new Expense();
  expensesData = new MatTableDataSource<Expense>();
  @Input() displayColumns: string[] = ['description', 'amount', 'date', 'category','action'];
  constructor(
    private expenseService: ExpenseService,
    private dialog : MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.expenseService.getAllExpense().subscribe(items => {
      this.expenses = items;
    });
    this.expensesData = new MatTableDataSource<Expense>(this.expenses);
    this.expensesData.paginator = this.paginator;
    this.expensesData.sort = this.sort;
  }

  delete(expense: Expense): void {
    this.expenses = this.expenses.filter(h => h !== expense);
    this.expenseService.deleteExpense(expense).subscribe();
    this.toastr.success("Item Delete Success!","Expense Delete",{
      timeOut:2000
    });
  }

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

  isDataEmpty(): boolean {
    return this.expenses.length === 0;
  }
}


