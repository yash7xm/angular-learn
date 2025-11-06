import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        alert('✅ Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = '❌ Registration failed. Please try again.';
        console.error(err);
      }
    });
  }
}
