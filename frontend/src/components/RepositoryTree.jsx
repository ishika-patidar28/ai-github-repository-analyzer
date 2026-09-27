import "./RepositoryTree.css";
function RepositoryTree({ files, onFileSelect }) {
    return (
        <div className="repository-tree">
            <h3>Repository Files</h3>

            {files.length === 0 ? (
                <p>No files found.</p>
            ) : (
                <ul>
                    {files.map((file) => (
                        <li key={file.path}>
                            <button
                                className="file-item"
                                onClick={() => {
                                    if (file.type === "file") {
                                        onFileSelect(file.path);
                                    }
                                }}
                            >
                <span>
                  {file.type === "dir" ? "📁" : "📄"}
                </span>

                                <span>{file.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RepositoryTree;