package com.examles.ems.service;

import com.examles.ems.entity.Question;
import com.examles.ems.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository repository;

    public Question createQuestion(Question question) {
        return repository.save(question);
    }

    public List<Question> getAllQuestions() {
        return repository.findAll();
    }

    public Question getQuestionById(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public void deleteQuestion(Long id) {
        repository.deleteById(id);
    }

    public Question updateQuestion(Long id, Question updatedQuestion) {
        Question existing = getQuestionById(id);
        existing.setContent(updatedQuestion.getContent());
        existing.setOptions(updatedQuestion.getOptions());
        existing.setCorrectOption(updatedQuestion.getCorrectOption());
        existing.setCategory(updatedQuestion.getCategory());
        existing.setDifficulty(updatedQuestion.getDifficulty());
        return repository.save(existing);
    }
}
