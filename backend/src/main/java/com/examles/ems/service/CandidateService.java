package com.examles.ems.service;

import com.examles.ems.entity.Candidate;
import com.examles.ems.entity.Exam;
import com.examles.ems.repository.CandidateRepository;
import com.examles.ems.repository.ExamRepository;
import com.examles.ems.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;
    private final ExamRepository examRepository;

    public List<Candidate> getAllCandidates() {
        return candidateRepository.findAll();
    }
    
    public Candidate getCandidateById(Long id) {
        return candidateRepository.findById(id).orElseThrow(() -> new RuntimeException("Candidate not found"));
    }
    
    public Candidate getCandidateByEmail(String email) {
        return candidateRepository.findByUserEmail(email)
                .orElseThrow(() -> new RuntimeException("Candidate profile not found"));
    }

    public void assignExamToCandidate(Long candidateId, Long examId) {
        Candidate candidate = getCandidateById(candidateId);
        Exam exam = examRepository.findById(examId).orElseThrow(() -> new RuntimeException("Exam not found"));
        
        candidate.getAssignedExams().add(exam);
        candidateRepository.save(candidate);
    }
}
