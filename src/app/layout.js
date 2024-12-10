/* eslint-disable new-cap */
/* eslint-disable camelcase */
import "./globals.css";
import AddLogEntry from "@/components/AddLogEntry";
import DownloadLogs from "@/components/DownloadLogs"
import Login from "@/components/Login";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-ibm-blue overscroll-none flex justify-center items-center flex-col min-h-screen`}
      >
        <div className="absolute bottom-4 right-4 flex space-x-4">
					<DownloadLogs />
          <AddLogEntry />
          <Login />
        </div>

        {children}
      </body>
    </html>
  );
}
