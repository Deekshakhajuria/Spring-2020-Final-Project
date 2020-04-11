import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router} from '@angular/router';
import { Expense } from "../../models/expense";
import { ExpenseService } from "../../services/expense.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  expenses: Expense[];
  
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile:ProfileComponent) => {
      this.user = profile.user;
    },
    err => {
      console.log(err);
      return false;
    });

    this.expenseService.getAllExpense().subscribe(items => {
      this.expenses = items;
  });

}
}

