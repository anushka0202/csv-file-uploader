import React, { useState, useRef } from "react";
import PageTop from "../components/PageTop";
import excel from "./../assets/excel.svg";
import "../styles/UploadPage.css";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    if (!file.name.endsWith(".csv")) {
      alert("Invalid file format. Please select a CSV file.");
      return;
    }

    setLoading(true);

    // File upload delay
    setTimeout(() => {
      setLoading(false);

      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    }, 2000);
  };

  const handleFileRead = (e) => {
    const csvData = e.target.result;

    if (!csvData) {
      alert("No data found in the uploaded file.");
      return;
    }

    const parsedData = parseCSV(csvData);
    setData(parsedData);
  };

  const parseCSV = (csvData) => {
    const rows = csvData.split(/\r\n|\n/);
    const headers = rows[0].split(",");
    const parsedData = [];

    // Iterating over each row (starting from the second line) to parse the data
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(",");
      const rowData = {};

      // Adding each value to the corresponding header
      for (let j = 0; j < headers.length; j++) {
        if (headers[j].trim() === "select tags") {
          // Concatenating all remaining values after the "Select Tags" column
          rowData[headers[j].trim()] = values
            .slice(j)
            .join(",")
            .trim()
            .replace(/"/g, "");
        } else if (headers[j].trim() === "selected tags") {
          rowData[headers[j].trim()] = "";
        } else {
          rowData[headers[j].trim()] = values[j].trim();
        }
      }
      parsedData.push(rowData);
    }
    return parsedData;
  };

  const handleTagSelect = (e, id) => {
    const selectedTag = e.target.value;
    setSelectedTags((prevSelectedTags) => {
      const updatedSelectedTags = [...prevSelectedTags];
      updatedSelectedTags[id] = [
        ...(updatedSelectedTags[id] || []),
        selectedTag,
      ];
      return updatedSelectedTags;
    });
  };

  const handleContainerClick = (e) => {
    if (file) {
      alert(
        "A file is already selected. Remove the current file before selecting a new one."
      );
    } else if (inputRef.current.style.display === "none") {
      inputRef.current.click();
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFile(null);
  };

  const removeTag = (rowIndex, tagIndex) => {
    setSelectedTags((prevSelectedTags) => {
      const updatedSelectedTags = [...prevSelectedTags];
      updatedSelectedTags[rowIndex].splice(tagIndex, 1);
      return updatedSelectedTags;
    });
  };

  return (
    <div className="upload-page-container">
      <PageTop title="Upload CSV" />
      <div className="drag-drop-container">
        <div
          className="drag-drop-box"
          onClick={handleContainerClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img
            style={{ width: "36px", height: "36px" }}
            src={excel}
            alt="excel"
          />
          {file ? (
            <>
              <p>{file.name}</p>
              <button className="remove-file-btn" onClick={handleRemoveFile}>
                Remove
              </button>
            </>
          ) : (
            <p
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              Drop your excel sheet here or{" "}
              <p style={{ color: "#605BFF" }}>browse</p>
            </p>
          )}
          {!file && (
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              ref={inputRef}
              style={{ display: "none" }}
            />
          )}
        </div>
        <button className="upload-btn" onClick={handleUpload}>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload
            </div>
          )}
        </button>
      </div>

      {data.length > 0 && (
        <div className="upload-table-container">
          <h2 className="uploads">Uploads</h2>
          <table>
            <thead>
              <tr style={{ height: "35px" }}>
                <th>SI No.</th>
                <th>Links</th>
                <th>Prefix</th>
                <th>Add Tags</th>
                <th>Selected Tags</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <a
                      className="item-link"
                      href={`http://${item.links}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.links}
                    </a>
                  </td>
                  <td>{item.prefix}</td>
                  <td>
                    <div className="select-container">
                      <select onChange={(e) => handleTagSelect(e, index)}>
                        <option selected="true" disabled="disabled">
                          Select Tags
                        </option>
                        {item["select tags"]
                          .trim() // Trim leading and trailing whitespaces
                          .replace(/,+$/, "") // Remove trailing commas
                          .split(",")
                          .map((tag, idx) => (
                            <option key={idx} value={tag.trim()}>
                              {tag.trim()}
                            </option>
                          ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    {selectedTags[index] && (
                      <div className="tag-chip-container">
                        {selectedTags[index].map((tag, idx) => (
                          <div key={idx} className="tag-chip">
                            {tag}
                            <button onClick={() => removeTag(index, idx)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M5 5L8 8M8 8L5 11M8 8L11 11M8 8L11 5"
                                  stroke="white"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
