package com.example.github_analyzer.controller;

import com.example.github_analyzer.dto.AnalyzeRequest;
import com.example.github_analyzer.service.GithubService;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyzeController {

    private final GithubService githubService;

    public AnalyzeController(GithubService githubService){
        this.githubService=githubService;
    }

    @GetMapping("/hello")
    public String hello(){
        return "AI Github Analyzer Backend is running";
    }

    @PostMapping("/analyze")
    public String analyzeRepository(@RequestBody AnalyzeRequest request){
        return githubService.getRepositoryInfo(request.getRepoUrl());
    }
}
