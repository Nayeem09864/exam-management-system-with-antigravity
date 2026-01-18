package com.examles.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "candidates")
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String phone;
    
    @Column(unique = true)
    private String studentId;

    // Assigned exams could be a ManyToMany here or managed via a separate table or just queried via ExamAttempt?
    // Requirement says "Candidate Management ... Candidate-exam assignment".
    // Let's add a List<Exam> assignedExams.
    
    @ManyToMany
    @JoinTable(
        name = "candidate_exam_assignments",
        joinColumns = @JoinColumn(name = "candidate_id"),
        inverseJoinColumns = @JoinColumn(name = "exam_id")
    )
    private java.util.List<Exam> assignedExams;
}
