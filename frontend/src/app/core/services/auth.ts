import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  userId: number;
  username: string;
  email: string;
  token: string;
}

export interface AuthUser {
  userId: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'https://localhost:7027/api/auth';
  private readonly tokenKey = 'expense_tracker_token';
  private readonly userKey = 'expense_tracker_user';

  constructor(private http: HttpClient) { }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        this.saveAuthData(response);
      })
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response) => {
        this.saveAuthData(response);
      })
    );
  }

  private saveAuthData(response: AuthResponse): void {
    localStorage.setItem(this.tokenKey, response.token);

    const user: AuthUser = {
      userId: response.userId,
      username: response.username,
      email: response.email
    };

    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): AuthUser | null {
    const userJson = localStorage.getItem(this.userKey);

    if (!userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson) as AuthUser;
    } catch {
      return null;
    }
  }

  getUserName(): string {
    return this.getCurrentUser()?.username || 'User';
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
