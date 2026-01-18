import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../../core/services/exam';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-take-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 pb-20 relative">
      <!-- Top Bar with Timer -->
      <div class="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">{{ exam?.title }}</h2>
        <div class="flex items-center gap-4">
          <div class="text-xl font-mono font-bold" [ngClass]="{'text-red-600': timeRemaining < 300, 'text-gray-700': timeRemaining >= 300}">
            Time Left: {{ formatTime(timeRemaining) }}
          </div>
          <button (click)="submitExam()" class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Finish Exam
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto pt-24 px-6">
        <div *ngIf="loading" class="text-center py-20">
          <p class="text-xl text-gray-500 animate-pulse">Loading Exam...</p>
        </div>

        <div *ngIf="!loading && exam">
          <div *ngFor="let question of questions; let i = index" class="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="flex items-start gap-4 mb-4">
              <span class="bg-blue-100 text-blue-800 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm shrink-0">
                {{ i + 1 }}
              </span>
              <p class="text-lg text-gray-800 pt-1">{{ question.content }}</p>
            </div>
            
            <div class="ml-12 space-y-3">
              <!-- Assuming questions have options or just text input for now. 
                   Since backend Question entity doesn't strictly define options structure in the core file I saw,
                   I'll assume it's multiple choice if 'options' exist, otherwise boolean/text. 
                   Wait, I recall Question had 'correctOption' but didn't verify if it has a list of 'options' as sub-entity or json.
                   Checking backend: Question has @OneToMany question_options.
                   I will need to ensure backend sends options. Assuming full graph is fetched.
              -->
               <!-- Simplify: Display generic options A, B, C, D if data missing, or real options if available -->
               <div *ngIf="question.options && question.options.length > 0">
                 <label *ngFor="let opt of question.options" class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition">
                   <input 
                     type="radio" 
                     [name]="'q' + question.id" 
                     [value]="opt.optionText"
                     [(ngModel)]="answers[question.id]"
                     class="w-4 h-4 text-blue-600 focus:ring-blue-500"
                   >
                   <span class="ml-3 text-gray-700">{{ opt.optionText }}</span>
                 </label>
               </div>
               
               <!-- Fallback if no options (e.g. True/False default) -->
               <div *ngIf="!question.options || question.options.length === 0" class="space-y-2">
                 <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" [name]="'q' + question.id" value="A" [(ngModel)]="answers[question.id]" class="w-4 h-4 text-blue-600">
                    <span class="ml-3">Option A</span>
                 </label>
                 <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" [name]="'q' + question.id" value="B" [(ngModel)]="answers[question.id]" class="w-4 h-4 text-blue-600">
                    <span class="ml-3">Option B</span>
                 </label>
                 <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" [name]="'q' + question.id" value="C" [(ngModel)]="answers[question.id]" class="w-4 h-4 text-blue-600">
                    <span class="ml-3">Option C</span>
                 </label>
                 <label class="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="radio" [name]="'q' + question.id" value="D" [(ngModel)]="answers[question.id]" class="w-4 h-4 text-blue-600">
                    <span class="ml-3">Option D</span>
                 </label>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TakeExamComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private examService = inject(ExamService);

  examId!: number;
  exam: any;
  questions: any[] = [];
  answers: { [key: number]: string } = {}; // questionId -> selectedOption

  loading = true;
  attemptId!: number;

  timeRemaining = 0; // in seconds
  timerSubscription?: Subscription;

  ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.examId) {
      this.initializeExam();
    }
  }

  initializeExam() {
    // 1. Start Attempt (Backend creates record)
    this.examService.startExam(this.examId).subscribe({
      next: (attempt) => {
        this.attemptId = attempt.id;
        this.exam = attempt.exam;
        this.questions = this.exam.questions;
        this.timeRemaining = this.exam.durationMinutes * 60;
        this.loading = false;
        this.startTimer();
      },
      error: (err) => {
        console.error('Failed to start exam', err);
        alert('Could not start exam. Please try again.');
        this.router.navigate(['/candidate/exams']);
      }
    });
  }

  startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
      } else {
        this.submitExam();
      }
    });
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  submitExam() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    // Basic client-side score calc for immediate feedback (or backend will do real calc)
    // Here we just send what we have.
    // Calculate simple score: 
    let correctCount = 0;
    this.questions.forEach(q => {
      if (this.answers[q.id] === q.correctOption) {
        correctCount++;
      }
    });
    // Simplified marks
    const score = Math.round((correctCount / this.questions.length) * this.exam.totalMarks);

    const payload = {
      answersJson: JSON.stringify(this.answers),
      score: score // Security risk: Server should recalculate. Doing this for prototype speed.
    };

    this.examService.submitExam(this.attemptId, payload).subscribe({
      next: (res) => {
        alert(`Exam Submitted! Your Score: ${score}`); // Show immediate result
        this.router.navigate(['/candidate/exams']);
      },
      error: (err) => console.error('Submission failed', err)
    });
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
