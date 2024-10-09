import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private readonly tokenKey = 'authToken';

  // Save token to localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retrieve token from localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Remove token from localStorage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
