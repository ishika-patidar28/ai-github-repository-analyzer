function RepositoryInput({ repoUrl, setRepoUrl, onAnalyze }) {
  return (
    <div>
      <input
        type="text"
        placeholder="https://github.com/username/repository"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      <button onClick={onAnalyze}>
        Analyze Repository
      </button>
    </div>
  );
}

export default RepositoryInput;