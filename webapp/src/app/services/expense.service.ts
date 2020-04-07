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
  return this.http.get<Expense[]>(this.baseurl, httpOptions);
};

  addExpense(expense: Expense){
    return this.http.post<Expense>(this.baseurl,expense, httpOptions)
      .subscribe((res) => {
        this.getAllExpense();
        console.log("Add success!")
      });
  };

  updateExpense(expense: Expense):  Observable<Expense>{
    const url = `${this.baseurl}/${expense._id}`;
    return this.http.put<Expense>(url, expense, httpOptions);
  }

  
  deleteExpense (expense: Expense | number): Observable<Expense> {
    const id = typeof expense === 'number' ? expense : expense._id;
    const url = `${this.baseurl}/${id}`;
    return this.http.delete<Expense>(url, httpOptions);
  }
}


