import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Income } from "../models/income";
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  getCurrentCategories(arg0: any) {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) {}
  incomes: Income[] =[];
  baseurl = 'http://localhost:3000/users/income';
  
// Get income resource from backend
  getAllIncome():Observable<Income[]>{
  return this.http.get<Income[]>(this.baseurl, httpOptions);
};

// Add income item to backend 
  addIncome(income: Income){
    return this.http.post<Income>(this.baseurl,income, httpOptions)
      .subscribe((res) => {
        this.getAllIncome();
        console.log("Add success!")
      });
  };

// Update income item to backend by item id
  updateIncome(id: number, income: Income): Observable<Income>{
    const url = `${this.baseurl}/${id}`;
    return this.http.put<Income>(url, income, httpOptions);
  }

  
// Delete income item from backend by item or id
  deleteIncome (income: Income | number): Observable<Income> {
    const id = typeof income === 'number' ? income : income._id;
    const url = `${this.baseurl}/${id}`;
    return this.http.delete<Income>(url, httpOptions);
  }
}