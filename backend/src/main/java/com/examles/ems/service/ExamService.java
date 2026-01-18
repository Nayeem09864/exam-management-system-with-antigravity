package com.examles.ems.service;

import com.examles.ems.entity.Exam;
import com.examles.ems.entity.Question;
import com.examles.ems.repository.ExamRepository;
import com.examles.ems.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExamService {

    private final ExamRepository examRepository;
    private final QuestionRepository questionRepository;

    @Transactional
    public Exam createExam(Exam exam) {
        if (exam.getAccessCode() == null || exam.getAccessCode().isEmpty()) {
            exam.setAccessCode(generateAccessCode());
        }
        return examRepository.save(exam);
    }

    private String generateAccessCode() {
        return java.util.UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Exam getExamById(Long id) {
        return examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }

    @Transactional
    public Exam addQuestionsToExam(Long examId, List<Long> questionIds) {
        Exam exam = getExamById(examId);
        List<Question> questions = questionRepository.findAllById(questionIds);
        exam.getQuestions().addAll(questions);
        return examRepository.save(exam);
    }

    @Transactional
    public Exam generateRandomQuestions(Long examId, int count, String category) {
        Exam exam = getExamById(examId);
        List<Question> allQuestions = questionRepository.findAll();
        
        // Filter by category if provided
        if (category != null && !category.isEmpty()) {
            allQuestions = allQuestions.stream()
                    .filter(q -> q.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }

        Collections.shuffle(allQuestions);
        List<Question> selected = allQuestions.stream().limit(count).collect(Collectors.toList());
        
        exam.getQuestions().addAll(selected);
        return examRepository.save(exam);
    }
    
    public Exam updateExamStatus(Long id, boolean isActive) {
        Exam exam = getExamById(id);
        exam.setIsActive(isActive);
        return examRepository.save(exam);
    }

    public Exam getExamByAccessCode(String code) {
        return examRepository.findAll().stream()
                .filter(e -> e.getAccessCode() != null && e.getAccessCode().equals(code))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid Access Code"));
    }
}
