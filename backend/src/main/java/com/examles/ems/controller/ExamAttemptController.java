package com.examles.ems.controller;

import com.examles.ems.entity.ExamAttempt;
import com.examles.ems.service.ExamAttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/attempts")
@RequiredArgsConstructor
public class ExamAttemptController {

    private final ExamAttemptService service;

    @PostMapping("/start/{examId}")
    public ResponseEntity<ExamAttempt> startExam(
            @PathVariable Long examId,
            Authentication authentication
    ) {
        return ResponseEntity.ok(service.startExam(examId, authentication.getName()));
    }

    @PostMapping("/{attemptId}/submit")
    public ResponseEntity<ExamAttempt> submitExam(
            @PathVariable Long attemptId,
            @RequestBody Map<String, Object> payload
    ) {
        // Simple payload handling: { "answersJson": "...", "score": 10 }
        String answersJson = (String) payload.get("answersJson");
        int score = (int) payload.get("score");
        return ResponseEntity.ok(service.submitExam(attemptId, answersJson, score));
    }

    @GetMapping("/my-attempts")
    public ResponseEntity<List<ExamAttempt>> getMyAttempts(Authentication authentication) {
        return ResponseEntity.ok(service.getAttemptsByCandidate(authentication.getName()));
    }
}
