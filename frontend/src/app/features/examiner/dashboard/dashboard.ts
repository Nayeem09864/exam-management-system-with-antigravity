import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExamService } from '../../../core/services/exam';
import { QuestionService } from '../../../core/services/question';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  examService = inject(ExamService);
  questionService = inject(QuestionService);
  exams: any[] = [];
  questionCount = 0;

  // Dynamic stats - will be updated on load
  stats = [
    { label: 'Total Exams', value: '0', icon: '📝', color: 'bg-blue-500' },
    { label: 'Questions', value: '0', icon: '❓', color: 'bg-green-500' },
    { label: 'Candidates', value: '45', icon: '👥', color: 'bg-purple-500' },
    { label: 'Completed', value: '89%', icon: '📊', color: 'bg-yellow-500' },
  ];

  ngOnInit() {
    this.loadExams();
    this.loadQuestionCount();
  }

  loadExams() {
    this.examService.getAllExams().subscribe((data: any[]) => {
      this.exams = data;
      this.stats[0].value = data.length.toString();
    });
  }

  loadQuestionCount() {
    this.questionService.getAllQuestions().subscribe((data: any[]) => {
      this.questionCount = data.length;
      this.stats[1].value = data.length.toString();
    });
  }
}
