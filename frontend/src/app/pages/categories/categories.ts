import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';
import {
  CategoryExpense,
  TransactionService
} from '../../core/services/transaction';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class CategoriesComponent implements OnInit {
  categories = signal<CategoryExpense[]>([]);
  errorMessage = signal('');
  userName = signal('User');

  totalExpense = computed(() => {
    return this.categories().reduce((sum, item) => sum + item.totalAmount, 0);
  });

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userName.set(this.authService.getUserName());
    this.loadCategories();
  }

  loadCategories(): void {
    this.errorMessage.set('');

    this.transactionService.getExpensesByCategory().subscribe({
      next: (response) => {
        this.categories.set(response);
      },
      error: (error: any) => {
        console.log('CATEGORIES ERROR:', error);
        this.errorMessage.set(error.error?.message || 'Failed to load categories.');
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

  getProgressWidth(percentage: number): number {
    if (percentage < 0) {
      return 0;
    }

    if (percentage > 100) {
      return 100;
    }

    return percentage;
  }
}
