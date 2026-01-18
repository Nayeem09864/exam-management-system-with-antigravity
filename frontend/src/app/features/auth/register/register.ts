import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['CANDIDATE', Validators.required]
  });

  isLoading = false;
  error = '';

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.error = '';
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          const role = this.authService.getRole();
          if (role === 'EXAMINER') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/candidate/exams']);
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          this.error = 'Registration failed. Email might be already in use.';
          console.error(err);
        }
      });
    }
  }
}
