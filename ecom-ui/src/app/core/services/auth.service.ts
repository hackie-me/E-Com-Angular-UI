import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';
import { isBrowserEnvironment } from '../utils/environment.utils';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); 
    public currentUser: Observable<any> = this.currentUserSubject.asObservable(); 

    constructor(private router: Router, private token: TokenService) {
        if (isBrowserEnvironment()) {  // Use the utility function
            const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
            this.currentUserSubject = new BehaviorSubject<any>(storedUser);
            this.currentUser = this.currentUserSubject.asObservable();
        }
    }

    // Method to get the current user data
    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    // Login method - stores user data and token
    login(user: any, token: string) {
        this.token.saveToken(token);
        if (isBrowserEnvironment()) {  // Use the utility function
            localStorage.setItem('currentUser', JSON.stringify(user)); 
            this.currentUserSubject.next(user);
        } else {
            this.currentUserSubject.next(null); 
        }
    }

    // Logout method - clears user data
    logout() {
        if (isBrowserEnvironment()) {  // Use the utility function
            this.token.clearToken(); 
            localStorage.removeItem('currentUser');
        }
        this.currentUserSubject.next(null); 
        this.router.navigate(['/login']);
    }

    // Check if the user is authenticated
    isAuthenticated(): boolean {
        return isBrowserEnvironment() && !!this.token.getToken();
    }
}
