import { useState } from "react";
import "./App.css";
import RepositoryInput from "./components/RepositoryInput";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");

  const handleAnalyze = () => {
    if (!repoUrl.trim()) {
      setMessage("Please enter a GitHub repository URL.");
      return;
    }

    if (!repoUrl.startsWith("https://github.com/")) {
      setMessage("Please enter a valid GitHub repository URL.");
      return;
    }

    setMessage(`Repository selected: ${repoUrl}`);
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