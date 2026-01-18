package com.examles.ems.controller;

import com.examles.ems.entity.Exam;
import com.examles.ems.service.ExamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/exams")
@RequiredArgsConstructor
public class ExamController {

    private final ExamService service;

    @PostMapping
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Exam> createExam(@RequestBody Exam exam) {
        return ResponseEntity.ok(service.createExam(exam));
    }

    @GetMapping
    public ResponseEntity<List<Exam>> getAllExams() {
        return ResponseEntity.ok(service.getAllExams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Exam> getExamById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getExamById(id));
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<Exam> getExamByCode(@PathVariable String code) {
        return ResponseEntity.ok(service.getExamByAccessCode(code));
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Exam>> getActiveExams() {
        return ResponseEntity.ok(service.getAllExams().stream()
                .filter(Exam::getIsActive)
                .toList());
    }

    @PostMapping("/{id}/questions")
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Exam> addQuestions(
        @PathVariable Long id, 
        @RequestBody List<Long> questionIds
    ) {
        return ResponseEntity.ok(service.addQuestionsToExam(id, questionIds));
    }
    
    @PostMapping("/{id}/generate-questions")
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Exam> generateQuestions(
        @PathVariable Long id,
        @RequestParam int count,
        @RequestParam(required = false) String category
    ) {
        return ResponseEntity.ok(service.generateRandomQuestions(id, count, category));
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Exam> updateStatus(@PathVariable Long id, @RequestParam boolean isActive) {
        return ResponseEntity.ok(service.updateExamStatus(id, isActive));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        service.deleteExam(id);
        return ResponseEntity.noContent().build();
    }
}
