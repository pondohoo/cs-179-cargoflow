import AddLogEntry from "@/components/AddLogEntry";
import Selection from "@/components/Selection";
import WipeStateButton from "@/components/WipeStateButton";
const Home = () => {
	return (
		<>
			<Selection />
			<WipeStateButton />
			<AddLogEntry />
		</>
	);
};

export default Home;
