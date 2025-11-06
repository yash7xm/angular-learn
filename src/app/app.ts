import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterModule, MatIconModule],
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
    </div>
  </nav>

  <!-- Page Content -->
  <section class="content">
    <router-outlet></router-outlet>
  </section>
</main>

  `,
  styleUrls: ['./app.css'],
})
export class App {
  title = 'home';
}
