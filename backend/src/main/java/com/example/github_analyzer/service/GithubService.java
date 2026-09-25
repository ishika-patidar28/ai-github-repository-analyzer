package com.example.github_analyzer.service;

import org.springframework.stereotype.Service;
@Service
public class GithubService {


    public String getRepositoryFiles(String repoUrl){
        return "Github repository receives :" +repoUrl;
    }
}
