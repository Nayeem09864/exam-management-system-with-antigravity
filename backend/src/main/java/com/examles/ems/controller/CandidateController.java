package com.examles.ems.controller;

import com.examles.ems.entity.Candidate;
import com.examles.ems.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/candidates")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateService service;

    @GetMapping
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<List<Candidate>> getAllCandidates() {
        return ResponseEntity.ok(service.getAllCandidates());
    }

    @PostMapping("/{candidateId}/assign-exam/{examId}")
    @PreAuthorize("hasAuthority('EXAMINER')")
    public ResponseEntity<Void> assignExam(
            @PathVariable Long candidateId, 
            @PathVariable Long examId
    ) {
        service.assignExamToCandidate(candidateId, examId);
        return ResponseEntity.ok().build();
    }
}
