"use client";
import { useState } from "react";
import addLogEntry from "@/utils/addLogEntry"

export default function AddLogEntry() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [inputText, setInputText] = useState("");

  function toggleIsPopupOpen() {
    setIsPopupOpen(!isPopupOpen);
  }

  function setIsPopupOpenTrue() {
    setIsPopupOpen(true);
  }

  function setIsPopupOpenFalse() {
    setIsPopupOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addLogEntry(inputText);
    setInputText("");
    setIsPopupOpenFalse();
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  return (
    <div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <form
            className="bg-white p-4 rounded shadow-md w-[30rem]"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              className="border border-gray-300 p-2 w-full text-black"
              value={inputText}
              onChange={handleChange}
            />
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                type="submit"
              >
                Submit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={setIsPopupOpenFalse}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div
        className="flex text-center justify-center items-center fixed bottom-10 right-10 w-[10rem] h-[3rem] bg-red-500 hover:bg-red-700 hover:cursor-pointer"
        onClick={setIsPopupOpenTrue}
      >
        <p>Add log entry</p>
      </div>
    </div>
  );
}
