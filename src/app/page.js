import AddLogEntry from "@/components/AddLogEntry";
import DownloadLogs from "@/components/DownloadLogs";
import Login from "@/components/Login";
import Selection from "@/components/Selection";
import WipeStateButton from "@/components/WipeStateButton";
const Home = () => {
	return (
		<>
			<div className="absolute bottom-4 right-4 flex space-x-4">
				<DownloadLogs />
				<AddLogEntry />
				<Login />
			</div>
			<Selection />
			<WipeStateButton />
		</>
	);
};

export default Home;
