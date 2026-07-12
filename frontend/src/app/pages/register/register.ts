import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {
    this.errorMessage = '';

    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (this.confirmPassword && this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.authService.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('REGISTER SUCCESS:', response);
        this.isLoading = false;
        this.router.navigateByUrl('/dashboard');
      },
      error: (error: any) => {
        console.log('REGISTER ERROR:', error);
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed.';
      }
    });
  }
}
