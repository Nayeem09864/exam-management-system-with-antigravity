import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from '../../../core/services/question';

@Component({
    selector: 'app-question-create',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './question-create.html',
    styleUrls: ['./question-create.css']
})
export class QuestionCreateComponent {
    private fb = inject(FormBuilder);
    private questionService = inject(QuestionService);
    private router = inject(Router);

    questionForm: FormGroup = this.fb.group({
        content: ['', Validators.required],
        options: this.fb.array([
            this.fb.control('', Validators.required),
            this.fb.control('', Validators.required),
            this.fb.control('', Validators.required),
            this.fb.control('', Validators.required)
        ]),
        correctOption: ['', Validators.required],
        category: [''],
        difficulty: ['MEDIUM', Validators.required]
    });

    isLoading = false;
    successMessage = '';

    get options() {
        return this.questionForm.get('options') as FormArray;
    }

    addOption() {
        this.options.push(this.fb.control('', Validators.required));
    }

    removeOption(index: number) {
        if (this.options.length > 2) {
            this.options.removeAt(index);
        }
    }

    onSubmit() {
        if (this.questionForm.valid) {
            this.isLoading = true;
            this.successMessage = '';

            this.questionService.createQuestion(this.questionForm.value).subscribe({
                next: () => {
                    this.isLoading = false;
                    this.successMessage = 'Question added successfully!';
                    this.questionForm.reset({
                        content: '',
                        options: ['', '', '', ''],
                        correctOption: '',
                        category: '',
                        difficulty: 'MEDIUM'
                    });
                    // Re-initialize options array to have 4 empty controls
                    while (this.options.length > 4) {
                        this.options.removeAt(0);
                    }
                    while (this.options.length < 4) {
                        this.options.push(this.fb.control('', Validators.required));
                    }
                    this.options.controls.forEach(ctrl => ctrl.setValue(''));

                },
                error: (err: any) => {
                    this.isLoading = false;
                    console.error(err);
                }
            });
        }
    }
}
