package com.example.github_analyzer.controller;

import com.example.github_analyzer.dto.AnalyzeRequest;
import com.example.github_analyzer.service.GithubService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyzeController {

    private final GithubService githubService;

    public AnalyzeController(GithubService githubService) {
        this.githubService = githubService;
    }

    // Test backend
    @GetMapping("/hello")
    public String hello() {
        return "AI GitHub Analyzer Backend is running!";
    }

    // Get repository information
    @PostMapping("/analyze")
    public String analyzeRepository(@RequestBody AnalyzeRequest request) {
        return githubService.getRepositoryInfo(request.getRepoUrl());
    }

    // Get files/folders from repository or specific folder
    @GetMapping("/files")
    public String getRepositoryFiles(
            @RequestParam String repoUrl,
            @RequestParam(required = false, defaultValue = "") String path) {

        return githubService.getRepositoryInfo(repoUrl);
    }

    // Get individual file content
    @GetMapping("/file")
    public String getFileContent(
            @RequestParam String repoUrl,
            @RequestParam String path) {

        return githubService.getRepositoryContents(repoUrl, path);
    }
}
