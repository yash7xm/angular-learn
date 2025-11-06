import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

interface User {
    id?: number;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:3000/users';
    private tokenKey = 'auth_token';
    private userEmailKey = 'user_email';

    isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

    constructor(private http: HttpClient, private router: Router) { }

    // Register user (POST to /users)
    register(email: string, password: string) {
        const newUser = { email, password };
        return this.http.post(this.baseUrl, newUser);
    }

    // Login: check if user exists with same credentials
    login(email: string, password: string) {
        return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`).pipe(
            map(users => {
                if (users.length > 0) {
                    const user = users[0];
                    localStorage.setItem(this.tokenKey, 'fake-jwt-token');
                    localStorage.setItem(this.userEmailKey, user.email);
                    this.isLoggedIn$.next(true);
                    return true;
                } else {
                    throw new Error('Invalid email or password');
                }
            })
        );
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userEmailKey);
        this.isLoggedIn$.next(false);
        this.router.navigate(['/login']);
    }

    hasToken() {
        return !!localStorage.getItem(this.tokenKey);
    }

    getCurrentUserEmail() {
        return localStorage.getItem(this.userEmailKey);
    }
}
