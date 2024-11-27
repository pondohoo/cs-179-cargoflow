"use client";
import { useState } from "react";

const UnloadLoadPrompt = (setContainersToLoad, setContainersToUnload) => {
    const [currentLoad, setCurrentLoad] = useState([]);
    const [currentUnload, setCurrentUnload] = useState();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [inputText, setInputText] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		addLogEntry(inputText);
		setInputText("");
		setIsPopupOpen(false);
	};

	const handleAddLoadContainer = (event) => {
		setCurrentLoad(...currentLoad, event.target.value);
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
                            placeholder="Enter exact container name."
							className="border border-gray-300 p-2 w-full text-black"
							value={inputText}
							onChange={handleAddLoadContainer}
						/>
						{/* <input
							type="text"
                            placeholder="Enter container weight."
							className="border border-gray-300 p-2 w-full text-black"
							value={inputText}
							onChange={handleChange}
						/> */}
						<div className="flex justify-between">
							<button
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
								type="submit"
							>
								Submit
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default UnloadLoadPrompt;