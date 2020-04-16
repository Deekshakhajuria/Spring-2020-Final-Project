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
  expenses: Expense[];
  incomes: Income[];
  
  
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

    this.incomeService.getAllIncome().subscribe(items => {
      this.incomes = items;
  });

    this.expenseService.getAllExpense().subscribe(items => {
      this.expenses = items;
  });

}
}

