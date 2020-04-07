import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expense } from "../models/expense";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) {}
  expenses: Expense[];
  baseurl = 'http://localhost:3000/users/expense';
  
  getAllExpense():Observable<Expense[]>{
  return this.http.get<Expense[]>('http://localhost:3000/users/expense', httpOptions);
};

  addExpense(expense: Expense): Observable<any> {
    return this.http.post<Expense>('http://localhost:3000/users/expense',expense, httpOptions);
  };

  updateExpense(expense: Expense): Observable<any> {
    return this.http.put<Expense>('http://localhost:3000/users/expense/'+ expense.id, expense, httpOptions);
  }

  
  deleteExpense (expense: Expense | number): Observable<Expense> {
    const id = typeof expense === 'number' ? expense : expense.id;
    const url = `${this.baseurl}/${id}`;
    return this.http.delete<Expense>(url, httpOptions);
  }
}


