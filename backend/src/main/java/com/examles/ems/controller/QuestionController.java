package com.examles.ems.controller;

import com.examles.ems.entity.Question;
import com.examles.ems.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService service;

    @PostMapping
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        return ResponseEntity.ok(service.createQuestion(question));
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        // In a real app, maybe filter by role or pagination
        return ResponseEntity.ok(service.getAllQuestions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getQuestionById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        return ResponseEntity.ok(service.updateQuestion(id, question));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        service.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
