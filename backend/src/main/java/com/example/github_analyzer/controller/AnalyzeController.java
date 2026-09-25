package com.example.github_analyzer.controller;

import com.example.github_analyzer.dto.AnalyzeRequest;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyzeController {

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }

    @PostMapping("/analyze")
    public String analyzeRepository(@RequestBody AnalyzeRequest request){
        return "Backend received repository :" +request.getRepoUrl();
    }
}
