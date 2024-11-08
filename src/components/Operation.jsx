"use client";

import { useEffect, useState } from "react";
import Grid from "./Grid";
import UploadManifest from "./UploadManifest";

import StepHandler from "./StepHandler";

const Operation = ({ operation }) => {
	const [manifest, setManifest] = useState();
  if (localStorage.getItem("manifest")) {
    setManifest(JSON.parse(localStorage.getItem("manifest")));
  }
	const [shipName, setShipName] = useState("");

	useEffect(() => {
		if (manifest) {
			localStorage.setItem("manifest", JSON.stringify(manifest));
		}
	}, [manifest]);
	return (
		<div className="flex flex-col">
			{shipName && <div>Ship: {shipName.slice(0, -4)}</div>}
			{!manifest ? (
				<UploadManifest setShipName={setShipName} setManifest={setManifest} />
			) : (
				<>
					<Grid manifest={manifest} />
					<StepHandler manifest={manifest} operation={operation} />
				</>
			)}
		</div>
	);
};

export default Operation;
