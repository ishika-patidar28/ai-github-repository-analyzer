
package com.example.github_analyzer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class GithubService {

    private final HttpClient httpClient = HttpClient.newHttpClient();

    private final ObjectMapper objectMapper = new ObjectMapper();


    // =========================================================
    // 1. GET REPOSITORY INFORMATION
    // =========================================================

    public String getRepositoryInfo(String repoUrl) {

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
                    .header(
                            "Accept",
                            "application/vnd.github+json"
                    )
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            return response.body();

        } catch (IOException | InterruptedException e) {

            return "Error while connecting to GitHub: "
                    + e.getMessage();
        }
    }


    // =========================================================
    // 2. GET REPOSITORY FILES AND FOLDERS
    // =========================================================

    // Get files and folders from repository root
    public String getRepositoryContents(String repoUrl) {

        return getRepositoryContents(repoUrl, "");
    }


    // Get files and folders from a specific folder
    public String getRepositoryContents(String repoUrl, String path) {

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
                            + repository
                            + "/contents";

            // Add folder path if provided
            if (path != null && !path.isBlank()) {
                githubApiUrl = githubApiUrl + "/" + path;
            }

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(githubApiUrl))
                    .header(
                            "Accept",
                            "application/vnd.github+json"
                    )
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
            );

            return response.body();

        } catch (IOException | InterruptedException e) {

            return "Error while getting repository contents: "
                    + e.getMessage();
        }
    }}