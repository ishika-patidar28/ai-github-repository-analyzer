package com.example.github_analyzer.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class GithubService {


    private final HttpClient httpClient = HttpClient.newHttpClient();
    public String getRepositoryInfo(String repoUrl){

        try {
            String[] parts = repoUrl
                    .replace("https://github.com/", "")
                    .split("/");

            if (parts.length < 2) {
                return "Invalid GitHub repository URL.";
            }

            String owner = parts[0];
            String repository = parts[1];

            String githubApiUrl =
                    "https://api.github.com/repos/"
                            + owner
                            + "/"
                            + repository;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(githubApiUrl))
                    .header("Accept", "application/vnd.github+json")
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            return response.body();

        } catch (IOException | InterruptedException e) {
            return "Error while connecting to GitHub: " + e.getMessage();
        }
    }
}

