import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';
import {
  Balance,
  Transaction,
  TransactionService,
  TransactionType
} from '../../core/services/transaction';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  balance = signal<Balance>({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });

  transactions = signal<Transaction[]>([]);
  errorMessage = signal('');
  userName = signal('User');

  TransactionType = TransactionType;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName.set(this.authService.getUserName());
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.errorMessage.set('');

    this.transactionService.getBalance().subscribe({
      next: (response) => {
        this.balance.set(response);
      },
      error: (error: any) => {
        console.log('BALANCE ERROR:', error);
        this.errorMessage.set(error.error?.message || 'Failed to load balance.');
      }
    });

    this.transactionService.getTransactions().subscribe({
      next: (response) => {
        this.transactions.set(response.slice(0, 5));
      },
      error: (error: any) => {
        console.log('TRANSACTIONS ERROR:', error);
        this.errorMessage.set(error.error?.message || 'Failed to load transactions.');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString('en-US') + ' AMD';
  }
}
