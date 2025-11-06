import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  login() {
    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password.';
      return;
    }

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        alert('✅ Login successful!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.error = '❌ Invalid email or password.';
        console.error(err);
      }
    });
  }
}
