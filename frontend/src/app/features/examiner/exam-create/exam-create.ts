import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamService } from '../../../core/services/exam';

@Component({
  selector: 'app-exam-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './exam-create.html',
  styleUrls: ['./exam-create.css']
})
export class ExamCreateComponent implements OnInit {
  private fb = inject(FormBuilder);
  private examService = inject(ExamService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  examForm = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    durationMinutes: [60, [Validators.required, Validators.min(1)]],
    totalMarks: [100, [Validators.required, Validators.min(1)]],
    passingMarks: [40, [Validators.required, Validators.min(1)]],
    isActive: [false]
  });

  isLoading = false;
  isEditMode = false;
  examId: number | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.examId = +id;
      this.loadExam(this.examId);
    }
  }

  loadExam(id: number) {
    this.isLoading = true;
    this.examService.getExamById(id).subscribe({
      next: (exam) => {
        this.examForm.patchValue({
          title: exam.title,
          description: exam.description,
          durationMinutes: exam.durationMinutes,
          totalMarks: exam.totalMarks,
          passingMarks: exam.passingMarks,
          isActive: exam.isActive
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    if (this.examForm.valid) {
      this.isLoading = true;

      const request$ = this.isEditMode && this.examId
        ? this.examService.updateExam(this.examId, this.examForm.value)
        : this.examService.createExam(this.examForm.value);

      request$.subscribe({
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
