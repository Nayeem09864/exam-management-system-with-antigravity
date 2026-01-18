import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamService } from '../../../core/services/exam';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <h2 class="text-3xl font-bold mb-6 text-gray-800">For Candidates</h2>
      
      <!-- Join by Code Section -->
      <div class="mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-xl font-semibold mb-4 text-gray-700">Join Exam by Code</h3>
        <div class="flex gap-4">
          <input 
            type="text" 
            [(ngModel)]="accessCode" 
            placeholder="Enter 6-digit Code" 
            class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button 
            (click)="joinByCode()" 
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Join Exam
          </button>
        </div>
        <p *ngIf="error" class="text-red-500 mt-2">{{ error }}</p>
      </div>

      <!-- Active Exams List -->
      <h3 class="text-xl font-semibold mb-4 text-gray-700">Active Exams</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let exam of activeExams" class="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h4 class="text-xl font-bold text-gray-800">{{ exam.title }}</h4>
              <p class="text-gray-500 text-sm mt-1">Duration: {{ exam.durationMinutes }} mins</p>
            </div>
            <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
          </div>
          <p class="text-gray-600 mb-4 line-clamp-2">{{ exam.description }}</p>
          <div class="flex justify-between items-center mt-4 border-t pt-4">
            <div class="text-sm text-gray-500">
               Total Marks: <span class="font-medium text-gray-900">{{ exam.totalMarks }}</span>
            </div>
            <button 
              (click)="takeExam(exam.id)" 
              class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Start Exam
            </button>
          </div>
        </div>
        
        <div *ngIf="activeExams.length === 0" class="col-span-full text-center py-10 bg-gray-50 rounded-lg">
          <p class="text-gray-500">No active exams available at the moment.</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ExamListComponent implements OnInit {
  private examService = inject(ExamService);
  private router = inject(Router);

  activeExams: any[] = [];
  accessCode: string = '';
  error: string = '';

  ngOnInit() {
    this.loadActiveExams();
  }

  loadActiveExams() {
    this.examService.getActiveExams().subscribe({
      next: (data) => this.activeExams = data,
      error: (err) => console.error('Failed to load exams', err)
    });
  }

  joinByCode() {
    if (!this.accessCode.trim()) return;

    this.examService.getExamByCode(this.accessCode).subscribe({
      next: (exam) => {
        this.router.navigate(['/candidate/take-exam', exam.id]);
      },
      error: () => {
        this.error = 'Invalid Access Code or Exam not found.';
      }
    });
  }

  takeExam(examId: number) {
    this.router.navigate(['/candidate/take-exam', examId]);
  }
}
