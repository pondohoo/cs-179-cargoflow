"use client";
import GridSquare from "./GridSquare";

const Grid = ({ manifest }) => {
	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col-reverse">
				{Array.from({ length: 8 }).map((_, i) => (
					<div key={i} className="flex">
						{manifest.slice(i * 12, (i + 1) * 12).map((entry, index) => (
							<div key={index}>
								<GridSquare entry={entry} />
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Grid;
