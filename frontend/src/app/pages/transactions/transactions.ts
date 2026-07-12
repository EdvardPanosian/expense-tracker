import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  CreateTransactionRequest,
  Transaction,
  TransactionService,
  TransactionType
} from '../../core/services/transaction';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class TransactionsComponent implements OnInit {
  allTransactions = signal<Transaction[]>([]);

  selectedFilter = signal<'all' | 'income' | 'expense'>('all');

  transactions = computed(() => {
    const filter = this.selectedFilter();
    const items = this.allTransactions();

    if (filter === 'income') {
      return items.filter(t => t.type === TransactionType.Income);
    }

    if (filter === 'expense') {
      return items.filter(t => t.type === TransactionType.Expense);
    }

    return items;
  });

  TransactionType = TransactionType;

  isModalOpen = signal(false);
  isEditMode = signal(false);
  errorMessage = signal('');
  isLoading = signal(false);

  editingTransactionId: number | null = null;

  form: CreateTransactionRequest = {
    title: '',
    amount: 0,
    type: TransactionType.Expense,
    category: '',
    date: this.getTodayDate(),
    description: ''
  };

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.errorMessage.set('');
    this.isLoading.set(true);

    this.transactionService.getTransactions().subscribe({
      next: (response) => {
        this.allTransactions.set(response);
        this.isLoading.set(false);
      },
      error: (error: any) => {
        console.log('LOAD TRANSACTIONS ERROR:', error);
        this.isLoading.set(false);
        this.errorMessage.set(error.error?.message || 'Failed to load transactions.');
      }
    });
  }

  changeFilter(filter: 'all' | 'income' | 'expense'): void {
    console.log('FILTER CHANGED:', filter);
    this.selectedFilter.set(filter);
  }

  openAddModal(): void {
    this.isModalOpen.set(true);
    this.isEditMode.set(false);
    this.editingTransactionId = null;
    this.errorMessage.set('');

    this.form = {
      title: '',
      amount: 0,
      type: TransactionType.Expense,
      category: '',
      date: this.getTodayDate(),
      description: ''
    };
  }

  openEditModal(transaction: Transaction): void {
    this.isModalOpen.set(true);
    this.isEditMode.set(true);
    this.editingTransactionId = transaction.id;
    this.errorMessage.set('');

    this.form = {
      title: transaction.title,
      amount: transaction.amount,
      type: transaction.type,
      category: transaction.category,
      date: transaction.date.substring(0, 10),
      description: transaction.description || ''
    };
  }

  closeModal(): void {
    this.isModalOpen.set(false);
  }

  saveTransaction(): void {
    this.errorMessage.set('');

    if (!this.form.title || !this.form.category || !this.form.amount || this.form.amount <= 0) {
      this.errorMessage.set('Please fill title, category and amount.');
      return;
    }

    if (this.isEditMode() && this.editingTransactionId !== null) {
      this.transactionService.updateTransaction(this.editingTransactionId, this.form).subscribe({
        next: () => {
          this.closeModal();
          this.loadTransactions();
        },
        error: (error: any) => {
          console.log('UPDATE TRANSACTION ERROR:', error);
          this.errorMessage.set(error.error?.message || 'Failed to update transaction.');
        }
      });

      return;
    }

    this.transactionService.createTransaction(this.form).subscribe({
      next: () => {
        this.closeModal();
        this.loadTransactions();
      },
      error: (error: any) => {
        console.log('CREATE TRANSACTION ERROR:', error);
        this.errorMessage.set(error.error?.message || 'Failed to create transaction.');
      }
    });
  }

  deleteTransaction(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this transaction?');

    if (!confirmed) {
      return;
    }

    this.transactionService.deleteTransaction(id).subscribe({
      next: () => {
        this.loadTransactions();
      },
      error: (error: any) => {
        console.log('DELETE TRANSACTION ERROR:', error);
        this.errorMessage.set(error.error?.message || 'Failed to delete transaction.');
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

  private getTodayDate(): string {
    return new Date().toISOString().substring(0, 10);
  }
}
