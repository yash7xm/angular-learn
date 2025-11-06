import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';
  loading = false; // ✅ for showing spinner

  constructor(private auth: AuthService, private router: Router) { }

  register() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields.';
      return;
    }

    this.error = '';
    this.loading = true; // show spinner

    this.auth.register(this.email, this.password).subscribe({
      next: () => {
        setTimeout(() => {
          this.loading = false;
          this.router.navigate(['/login']);
        }, 1000); // simulate a short delay for smoother UX
      },
      error: (err) => {
        this.loading = false;
        this.error = '❌ Registration failed. Please try again.';
        console.error(err);
      }
    });
  }
}
