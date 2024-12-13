"use client";
import { useState } from "react";
import downloadLogs from "@/utils/downloadLogs";

const DownloadLogs = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const databaseName = "cargoflowDatabase";
    const storeName = "cargoflowLogs" + new Date().getFullYear();
    const dbRequest = indexedDB.open(databaseName, 1);

    dbRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!event.oldVersion) {
        setErrorMessage("No logs found for the current year.");
        db.close();
        indexedDB.deleteDatabase(databaseName);
      }
    };

    dbRequest.onsuccess = (event) => {
      const db = event.target.result;

      const transaction = db.transaction(storeName, "readonly");
      const objectStore = transaction.objectStore(storeName);

      const getRequest = objectStore.get("password");

      getRequest.onerror = () => {
        setErrorMessage("Error checking password.");
      };

      getRequest.onsuccess = () => {
        const result = getRequest.result;
        if (result && result.password === password) {
          setErrorMessage("");
          downloadLogs();
          setShowPopup(false);
        } else {
          setErrorMessage("Incorrect password. Please try again.");
        }
      };
    };
  };

  const handlePopup = () => {
    setShowPopup(!showPopup);
    setPassword("");
    setErrorMessage("");
  };

  return (
    <div>
      <button
        onClick={handlePopup}
        className="px-4 py-2 bg-ibm-yellow text-black font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      >
        Download logs
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl text-ibm-gray font-bold mb-4">Download logs</h2>
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-4 py-2 mb-4 w-full"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-ibm-green text-black font-medium rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
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
}

export default DownloadLogs;
