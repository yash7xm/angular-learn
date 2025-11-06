import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, MatIconModule, AsyncPipe], // ✅ Added AsyncPipe here
  styleUrls: ['./app.css'],
  template: `
    <main class="main-div">
      <!-- Modern Navigation Bar -->
      <nav class="navbar">
        <div class="nav-left">
          <a [routerLink]="['/']" class="brand">
            <img class="brand-logo" src="/assets/logo.svg" alt="logo" />
          </a>
        </div>

        <div class="nav-right">
          <a
            routerLink="/wishlist"
            routerLinkActive="active-link"
            class="nav-link wishlist-link"
          >
            <mat-icon>favorite</mat-icon>
            Wishlist
          </a>

          <!-- Auth Buttons -->
          <div class="auth-buttons">
            @if (!(auth.isLoggedIn$ | async)) {
              <a routerLink="/login" class="btn login-btn">Login</a>
              <a routerLink="/register" class="btn register-btn">Register</a>
            } @else {
              <span class="user-email">{{ auth.getCurrentUserName() }}</span>
              <button class="btn logout-btn" (click)="logout()">Logout</button>
            }
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
})
export class App {
  title = 'home';
  auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
