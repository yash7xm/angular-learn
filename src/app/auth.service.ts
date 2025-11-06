import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError, map, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'https://pet-store-backend-05kn.onrender.com';
    private tokenKey = 'user_Id'; // we’ll use this to store the MongoDB user ID
    private userEmailKey = 'username'; // username, not email in this case

    isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: HttpClient, private router: Router) { }

    /**
     * ✅ Check if username already exists
     */
    checkUserExist(username: string) {
        return this.http.post(`${this.baseUrl}/checkUserExist`, { username });
    }

    /**
     * ✅ Register a new user
     */
    register(username: string, password: string) {
        return this.http.post(`${this.baseUrl}/register`, { username, password }).pipe(
            map((userId: any) => {
                // save userId in localStorage
                localStorage.setItem(this.tokenKey, userId);
                localStorage.setItem(this.userEmailKey, username);
                this.isLoggedIn$.next(true);
                return true;
            }),
            catchError(err => {
                console.error('Registration error:', err);
                return throwError(() => new Error('Failed to register user'));
            })
        );
    }

    /**
     * ✅ Log in existing user
     */
    login(username: string, password: string) {
        return this.http.post(`${this.baseUrl}/signIn`, { username, password }).pipe(
            map((userId: any) => {
                if (userId) {
                    localStorage.setItem(this.tokenKey, userId);
                    localStorage.setItem(this.userEmailKey, username);
                    this.isLoggedIn$.next(true);
                    return true;
                } else {
                    throw new Error('Invalid username or password');
                }
            }),
            catchError(err => {
                console.error('Login failed:', err);
                return throwError(() => new Error('Invalid username or password'));
            })
        );
    }

    /**
     * ✅ Log out user
     */
    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userEmailKey);
        this.isLoggedIn$.next(false);
        this.router.navigate(['/login']);
    }

    /**
     * ✅ Check login state
     */
    hasToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    /**
     * ✅ Get current username
     */
    getCurrentUserName(): string | null {
        return localStorage.getItem(this.userEmailKey);
    }
}
