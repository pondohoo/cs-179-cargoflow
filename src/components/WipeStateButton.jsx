"use client";
import wipeState from "@/utils/wipeState";
const WipeStateButton = () => {
	const handleClick = () => {
		wipeState();
	};
	return (
		<button
			className="fixed bottom-1  flex text-black items-center justify-center border-2 border-black bg-white cursor-pointer px-2 py-1 m-0"
			onClick={handleClick}
		>
			Wipe current operation
		</button>
	);
};

export default WipeStateButton;
