/* eslint-disable new-cap */
/* eslint-disable camelcase */
import "./globals.css";
import AddLogEntry from "@/components/AddLogEntry"

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`bg-ibm-blue overscroll-none flex justify-center items-center flex-col min-h-screen`}>
				<AddLogEntry />
				{children}
			</body>
		</html>
	);
}
