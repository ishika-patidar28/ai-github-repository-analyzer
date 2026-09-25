package com.example.github_analyzer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AnalyzeController {

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
}
