"use client";
import GridSquare from "./GridSquare";

const Grid = ({ manifest, currentStep }) => {
	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col-reverse">
				{Array.from({ length: manifest.length / 12 }).map((_, i) => (
					<div key={i} className="flex">
						{manifest.slice(i * 12, (i + 1) * 12).map((entry, index) => (
							<div key={index}>
								<GridSquare entry={entry} currentStep={currentStep} />
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Grid;
