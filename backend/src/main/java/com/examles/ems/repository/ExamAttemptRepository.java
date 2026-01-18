package com.examles.ems.repository;

import com.examles.ems.entity.ExamAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, Long> {
    List<ExamAttempt> findByCandidateId(Long candidateId);
    List<ExamAttempt> findByExamId(Long examId);
}
