import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router} from '@angular/router';
import { Expense } from "../../models/expense";
import { Income } from "../../models/income";
import { ExpenseService } from "../../services/expense.service";
import { IncomeService } from "../../services/income.service";
import { from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  expenses: Expense[]=[];
  incomes: Income[]=[];
  totalExpense: any = 0;
  totalIncome: any = 0;
  balance: any = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private expenseService: ExpenseService,
    private incomeService: IncomeService){ }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile:ProfileComponent) => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });

    // get total logged income values
    this.incomeService.getAllIncome().subscribe(items => {
      this.incomes = items;
      items.forEach(x => {
        this.totalIncome += x.amount;
      })
  });
    // get total logged expense values
    this.expenseService.getAllExpense().subscribe(items => {
      this.expenses = items;
      items.forEach(x=> {
        this.totalExpense +=x.amount;
      })

  });
}

}

