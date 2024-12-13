"use client";
import addLogEntry from "@/utils/addLogEntry";
import React, { useState } from "react";

const UploadManifest = ({ setManifest, setShipName }) => {
	const [uploading, setUploading] = useState(false);

	const readFileContent = (file) => {
		const reader = new FileReader();
		return new Promise((resolve, reject) => {
			reader.onload = (event) => resolve(event.target.result);
			reader.onerror = (error) => reject(error);
			reader.readAsText(file);
		});
	};
	const formatManifest = (content, fileName) => {
		const lines = content.split("\n");
		const result = [];

		let counter = 0;

		lines.forEach((line) => {
			const [rowString, colString, weightString, nameString] = line.split(",");

			const row = parseInt(rowString.trim().slice(1), 10);
			const col = parseInt(colString.trim().slice(0, -1), 10);
			const name = nameString.trim();
			const weight = parseInt(weightString.trim().slice(1, -1));

			if (name !== "UNUSED" && name !== "NAN") {
				counter++;
			}

			console.log("row", row, "col", col);

			result.push({
				row,
				col,
				weight,
				name,
			});
		});
		addLogEntry("Manifest " + fileName + " is opened, there are " + counter + " containers on the ship");
		// Create rows for buffer.
		for (let row = 9; row <= 12; row++) {
			for (let col = 13; col <= 36; col++) {
				result.push({
					row,
					col,
					weight: 0,
					name: "UNUSED",
				});
			}
		}
		console.log("before slots", result);

		// Create pink slot above ship
		result.push({
			row: 13,
			col: 37,
			weight: 0,
			name: "UNUSED",
		});
		// Create pink slot above buffer
		result.push({
			row: 14,
			col: 38,
			weight: 0,
			name: "UNUSED",
		});
		// Create slot for loading truck
		result.push({
			row: 15,
			col: 39,
			weight: 0,
			name: "UNUSED",
		});

		console.log("after slots", result);
		return result;
	};
	const handleInput = (e) => {
		setUploading(true);

		const file = e.target.files[0];
		setShipName(file.name);

		readFileContent(file)
			.then((content) => {
				const manifest = formatManifest(content, file.name);
				console.log("manifest is", manifest);
				setManifest(manifest);
			})
			.catch((error) => console.log(error));
		setUploading(false);
	};

	return (
		<div className="mt-3">
			<div className="flex flex-col items-start">
				{uploading && <p>uploading...</p>}
				<label
					htmlFor="dropzone-file"
					className="flex items-center justify-center border-2 border-black bg-white cursor-pointer px-2 py-1 m-0"
				>
					<p className="text-sm text-black font-semibold m-0">
						attach manifest
					</p>
					<input
						id="dropzone-file"
						onChange={handleInput}
						type="file"
						className="hidden"
						title="attatchment"
						accept=".txt"
					/>
				</label>
			</div>
		</div>
	);
};

export default UploadManifest;
