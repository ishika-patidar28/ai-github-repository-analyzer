import { useState } from "react";
import "./App.css";
import RepositoryInput from "./components/RepositoryInput";
import RepositoryTree from "./components/RepositoryTree";

function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [fileContent, setFileContent] = useState("");

  // Analyze repository
  const handleAnalyze = async () => {

    // Check if URL is empty
    if (!repoUrl.trim()) {
      setMessage("Please enter a GitHub repository URL.");
      return;
    }

    // Check if URL is a GitHub URL
    if (!repoUrl.startsWith("https://github.com/")) {
      setMessage("Please enter a valid GitHub repository URL.");
      return;
    }

    try {

      setMessage("Loading repository...");
      setFiles([]);
      setSelectedFile("");
      setFileContent("");

      // Get repository information
      const response = await fetch(
          "http://localhost:8080/api/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              repoUrl: repoUrl,
            }),
          }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      // Get repository files
      const filesResponse = await fetch(
          `http://localhost:8080/api/files?repoUrl=${encodeURIComponent(
              repoUrl
          )}`
      );

      if (!filesResponse.ok) {
        throw new Error("Could not get repository files");
      }

      const filesData = await filesResponse.json();

      setFiles(filesData);
      setMessage("Repository loaded successfully.");

    } catch (error) {

      console.error("Error:", error);

      setMessage(
          "Could not connect to backend or GitHub."
      );
    }
  };


  // Select a file
  const handleFileSelect = async (path) => {

    try {

      setSelectedFile(path);
      setFileContent("Loading file...");

      const response = await fetch(
          `http://localhost:8080/api/file?repoUrl=${encodeURIComponent(
              repoUrl
          )}&path=${encodeURIComponent(path)}`
      );

      if (!response.ok) {
        throw new Error("Could not get file content");
      }

      const content = await response.text();

      setFileContent(content);

    } catch (error) {

      console.error("Error:", error);

      setFileContent(
          "Could not load file content."
      );
    }
  };


  return (
      <div className="app">

        <header className="header">

          <h1>
            AI GitHub Repository Analyzer
          </h1>

          <p>
            Understand any GitHub repository with
            AI-powered file analysis.
          </p>

        </header>


        <main className="container">

          <div className="analyzer-card">

            <h2>
              Analyze Repository
            </h2>

            <p className="description">
              Enter a public GitHub repository URL to
              start analyzing its structure, files,
              and code.
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


            {/* Repository file tree */}

            {files.length > 0 && (
                <RepositoryTree
                    files={files}
                    onFileSelect={handleFileSelect}
                />
            )}


            {/* Selected file */}

            {selectedFile && (
                <div className="file-viewer">

                  <h3>
                    {selectedFile}
                  </h3>

                  <pre>
                {fileContent}
              </pre>

                </div>
            )}

          </div>

        </main>

      </div>
  );
}

export default App;