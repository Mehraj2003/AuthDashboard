import React, { useState } from "react";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle file input change
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Handle file upload
  const handleUpload = () => {
    const formData = new FormData();

    // Append files to the form data
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    fetch("http://localhost:5000/api/files/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Files uploaded successfully!");
          setUploadedFiles(data.files); // Update state with newly uploaded files
        } else {
          alert("File upload failed!");
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
      });
  };

  // Fetch uploaded files
  const fetchFiles = () => {
    fetch("http://localhost:5000/api/files")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUploadedFiles(data.files);
        } else {
          alert("Failed to fetch files!");
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">File Upload</h1>

        {/* File Upload Section */}
        <div className="mb-4">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2"
          />
        </div>
        <button
          onClick={handleUpload}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Upload Files
        </button>

        {/* Fetch Files Section */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchFiles}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Fetch Uploaded Files
          </button>
        </div>

        {/* Display Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Uploaded Files</h2>
            <ul className="list-none space-y-3">
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="p-3 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-between"
                >
                  <span className="text-gray-600">{file.name}</span>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
