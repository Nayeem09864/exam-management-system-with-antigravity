import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';
import { DashboardComponent } from './features/examiner/dashboard/dashboard';
import { ExamListComponent } from './features/candidate/exam-list/exam-list';
import { TakeExamComponent } from './features/candidate/take-exam/take-exam';
import { ExamCreateComponent } from './features/examiner/exam-create/exam-create';

export const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent }, // Examiner
            { path: 'exams/create', component: ExamCreateComponent }, // Examiner
            { path: 'exams/edit/:id', component: ExamCreateComponent }, // Examiner - Edit
            { path: 'questions/create', loadComponent: () => import('./features/examiner/question-create/question-create').then(m => m.QuestionCreateComponent) }, // Examiner
            { path: 'candidate/exams', component: ExamListComponent }, // Candidate
            { path: 'candidate/exam/:id', component: TakeExamComponent }, // Candidate
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'auth/login' }
];
