import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExamService } from '../../../core/services/exam';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  examService = inject(ExamService);
  exams: any[] = [];

  // Dummy stats
  stats = [
    { label: 'Total Exams', value: '12', icon: '📝', color: 'bg-blue-500' },
    { label: 'Questions', value: '150', icon: '❓', color: 'bg-green-500' },
    { label: 'Candidates', value: '45', icon: 'users', color: 'bg-purple-500' },
    { label: 'Completed', value: '89%', icon: 'chart', color: 'bg-yellow-500' },
  ];

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.examService.getAllExams().subscribe((data: any[]) => {
      this.exams = data;
    });
  }
}
