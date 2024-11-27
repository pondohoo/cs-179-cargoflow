"use client";
import { useState } from "react";

const UnloadLoadPrompt = ({ manifest, setPrompting, setContainersToLoad, setContainersToUnload, containersToLoad, containersToUnload }) => {
	const [inputText, setInputText] = useState("");
	const [message, setMessage] = useState("");
	const [isUnloadContainer, setIsUnloadContainer] = useState(true); // true-> unload, false->load

	const handleSubmit = (event) => {
		event.preventDefault();
		const containerExists = manifest.some(container => container.name === inputText);

		if (isUnloadContainer && !containerExists) {
			setMessage("Container not found");
			return;
		}

		if (isUnloadContainer) {
			setContainersToUnload((prev) => [...prev, inputText]);
		} else {
			setContainersToLoad((prev) => [...prev, inputText]);
		}
		setInputText("");
		setMessage("Succesfully added container");
	};

	const handleChange = (event) => {
		setInputText(event.target.value);
	};

	const handleSwitchUnloadLoad = () => {
		setIsUnloadContainer(!isUnloadContainer);
	};

	const handleFinish = () => {
		if (containersToLoad.length > 0 || containersToUnload.length > 0) {
			setPrompting(false);
		} else {
			setMessage("Please add at least one container to load or unload.");
		}
	};

	return (
		<div>
			<div className="fixed inset-0 flex items-center justify-center">
				<form
					className="bg-white p-4 rounded shadow-md w-[30rem]"
					onSubmit={handleSubmit}
				>
					<div className="text-black">Enter container name to {isUnloadContainer ? "unload" : "load"}</div>
					<input
						type="text"
						placeholder="Enter exact container name.."
						className="border border-gray-300 p-2 w-full text-black"
						value={inputText}
						onChange={handleChange}
					/>
					<div className="justify-between">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
							type="submit"
						>
							Submit container
						</button>
						<div className="text-black p-10 h-6">{message}</div>
					</div>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
						type="button"
						onClick={handleSwitchUnloadLoad}
					>
						{isUnloadContainer ? "Switch to Load" : "Switch to Unload"}
					</button>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
						type="button"
						onClick={handleFinish}
					>
						Done
					</button>
				</form>
			</div>
		</div>
	);
};

export default UnloadLoadPrompt;