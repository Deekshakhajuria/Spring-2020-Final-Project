import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { Income } from "../../models/income";
import { IncomeService } from "../../services/income.service";
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IncomeItemComponent } from "../income-item/income-item.component";
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-incomedashboard',
  templateUrl: './income-dashboard.component.html',
  styleUrls: ['./income-dashboard.component.scss']
})
export class IncomeDashboardComponent implements OnInit {
  incomes: Income[];
  public newIncome: Income = new Income();

  constructor(
    private incomeService: IncomeService,
    private dialog : MatDialog,
    private toastr: ToastrService) { }

  // List all added income item
  ngOnInit(): void {
    this.incomeService.getAllIncome().subscribe(items => {
      this.incomes = items;
    });
  }

  // Delete current income item
  delete(income: Income): void {
    this.incomes = this.incomes.filter(h => h !== income);
    this.incomeService.deleteIncome(income).subscribe();
    this.toastr.success("Item Delete Success!","Income Delete",{
      timeOut:2000
    });
  }

  // Enable matdialog, user income item index ad input data.
  add(index: number){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.disableClose = true;
        dialogConfig.width = "50%";
        dialogConfig.data = {
          index 
        };
        this.dialog.open(IncomeItemComponent,dialogConfig);
        this.dialog.afterAllClosed.subscribe(() => {
          this.ngOnInit();
        })
  }

  // Check the list 
  isDataEmpty(): boolean {
    return this.incomes.length === 0;
  }
}


