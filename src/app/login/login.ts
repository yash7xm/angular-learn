import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false; // ✅ added

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password.';
      return;
    }

    this.error = '';
    this.loading = true; // ✅ show spinner

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        setTimeout(() => { // simulate slight delay for smooth UX
          this.loading = false;
          this.router.navigate(['/']);
        }, 1000);
      },
      error: (err) => {
        this.loading = false;
        this.error = '❌ Invalid email or password.';
        console.error(err);
      }
    });
  }
}
