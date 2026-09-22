function App() {
  return (
    <div className="container">
      <div className="card">
        <h1>AI GitHub Repository Analyzer</h1>

        <p>
          Analyze any GitHub repository using AI.
        </p>

        <input
          type="text"
          placeholder="https://github.com/username/repository"
        />

        <button>
          Analyze Repository
        </button>
      </div>
    </div>
  );
}

export default App;