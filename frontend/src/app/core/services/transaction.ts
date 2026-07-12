import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum TransactionType {
  Income = 1,
  Expense = 2
}

export interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description?: string;
}

export interface CreateTransactionRequest {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description?: string;
}

export interface Balance {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export interface CategoryExpense {
  category: string;
  totalAmount: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly apiUrl = 'https://localhost:7027/api/transactions';

  constructor(private http: HttpClient) { }

  getTransactions(type?: TransactionType): Observable<Transaction[]> {
    let params = new HttpParams();

    if (type) {
      params = params.set('type', type);
    }

    return this.http.get<Transaction[]>(this.apiUrl, { params });
  }

  getBalance(): Observable<Balance> {
    return this.http.get<Balance>(`${this.apiUrl}/balance`);
  }

  getExpensesByCategory(): Observable<CategoryExpense[]> {
    return this.http.get<CategoryExpense[]>(`${this.apiUrl}/expenses-by-category`);
  }

  createTransaction(data: CreateTransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, data);
  }

  updateTransaction(id: number, data: CreateTransactionRequest): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, data);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
