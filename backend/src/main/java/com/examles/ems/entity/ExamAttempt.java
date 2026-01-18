package com.examles.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "exam_attempts")
public class ExamAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private Integer score;
    
    private boolean isCompleted;
    
    // Simplification: We will not store individual answers for now unless strictly needed for review. 
    // If we need to show "Correct/Incorrect" review, we need to store them.
    // Let's add simple JSON storage for answers: Map<Long, String> questionId -> selectedOption
    
    @Column(columnDefinition = "TEXT")
    private String answersJson; // stored as JSON string
}
