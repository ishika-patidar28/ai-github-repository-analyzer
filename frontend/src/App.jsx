import { useState } from "react";
import "./App.css";
import RepositoryInput from "./components/RepositoryInput";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAnalyze = async () => {
    if (!repoUrl.trim()) {
      setMessage("Please enter a GitHub repository URL.");
      return;
    }

    if (!repoUrl.startsWith("https://github.com/")) {
      setMessage("Please enter a valid GitHub repository URL.");
      return;
    }

    try {
      // Show loading message
      setMessage("Sending repository to backend...");

      // Send repository URL to Spring Boot backend
      const response = await fetch("http://localhost:8080/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repoUrl: repoUrl,
        }),
      });

      // Check if backend returned an error
      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      // Get response from backend
      const result = await response.text();

      // Display backend response
      setMessage(result);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Could not connect to backend.");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>AI GitHub Repository Analyzer</h1>

        <p>
          Understand any GitHub repository with AI-powered file analysis.
        </p>
      </header>

      <main className="container">
        <div className="analyzer-card">
          <h2>Analyze Repository</h2>

          <p className="description">
            Enter a public GitHub repository URL to start analyzing its
            structure, files, and code.
          </p>

          <RepositoryInput
            repoUrl={repoUrl}
            setRepoUrl={setRepoUrl}
            onAnalyze={handleAnalyze}
          />

          {message && (
            <div className="result-message">
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );

}

export default App;