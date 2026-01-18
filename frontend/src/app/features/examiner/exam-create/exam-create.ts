import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExamService } from '../../../core/services/exam';

@Component({
  selector: 'app-exam-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exam-create.html',
  styleUrls: ['./exam-create.css']
})
export class ExamCreateComponent {
  private fb = inject(FormBuilder);
  private examService = inject(ExamService);
  private router = inject(Router);

  examForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    durationMinutes: [60, [Validators.required, Validators.min(1)]],
    totalMarks: [100, [Validators.required, Validators.min(1)]],
    passingMarks: [40, [Validators.required, Validators.min(1)]],
    isActive: [false]
  });

  isLoading = false;

  onSubmit() {
    if (this.examForm.valid) {
      this.isLoading = true;
      this.examService.createExam(this.examForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.isLoading = false;
          console.error(err);
        }
      });
    }
  }
}
