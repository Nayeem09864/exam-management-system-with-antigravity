package com.examles.ems.service;

import com.examles.ems.entity.Candidate;
import com.examles.ems.entity.Exam;
import com.examles.ems.entity.ExamAttempt;
import com.examles.ems.repository.ExamAttemptRepository;
import com.examles.ems.repository.ExamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExamAttemptService {

    private final ExamAttemptRepository attemptRepository;
    private final ExamRepository examRepository;
    private final CandidateService candidateService;

    @Transactional
    public ExamAttempt startExam(Long examId, String candidateEmail) {
        Candidate candidate = candidateService.getCandidateByEmail(candidateEmail);
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new RuntimeException("Exam not found"));
        
        // internal check if already started or completed? ignoring for now.
        
        ExamAttempt attempt = ExamAttempt.builder()
                .exam(exam)
                .candidate(candidate)
                .startTime(LocalDateTime.now())
                .isCompleted(false)
                .score(0)
                .build();
                
        return attemptRepository.save(attempt);
    }
    
    @Transactional
    public ExamAttempt submitExam(Long attemptId, String answersJson, int calculatedScore) {
        ExamAttempt attempt = attemptRepository.findById(attemptId)
                .orElseThrow(() -> new RuntimeException("Attempt not found"));
        
        if (attempt.isCompleted()) {
            throw new RuntimeException("Exam already submitted");
        }
        
        attempt.setEndTime(LocalDateTime.now());
        attempt.setAnswersJson(answersJson);
        attempt.setScore(calculatedScore); // Score calculation ideally should happen on server side for security
        attempt.setCompleted(true);
        
        return attemptRepository.save(attempt);
    }

    public List<ExamAttempt> getAttemptsByCandidate(String email) {
        Candidate candidate = candidateService.getCandidateByEmail(email);
        return attemptRepository.findByCandidateId(candidate.getId());
    }
}
