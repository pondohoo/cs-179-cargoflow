"use client";
import { useState } from "react";
import addLogEntry from "@/utils/addLogEntry"

const AddLogEntry = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputText.trim()) {
      setErrorMessage("Please enter a log entry.");
      return;
    }
    addLogEntry(inputText);

    setInputText("");
    setShowPopup(false);
    setErrorMessage("");
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
    setInputText("");
    setErrorMessage("");
  };

  return (
    <div>
      <button
        onClick={handlePopup}
        className="px-4 py-2 bg-ibm-yellow text-white font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Add log entry
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl text-ibm-gray font-bold mb-4">Add log entry</h2>
            <input
              type="text"
              placeholder="Enter log entry"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-4 py-2 mb-4 w-full"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-ibm-green text-white font-medium rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Submit
              </button>
              <button
                onClick={handlePopup}
                className="px-4 py-2 bg-ibm-gray text-white font-medium rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLogEntry;