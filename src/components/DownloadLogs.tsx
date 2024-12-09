"use client";
import downloadLogs from "@/utils/downloadLogs";

export default function DownloadLogs() {
  return (
    <div
      className="flex text-center justify-center items-center fixed bottom-10 right-[14rem] w-[10rem] h-[3rem] bg-red-500 hover:bg-red-700 hover:cursor-pointer"
      onClick={downloadLogs}
    >
      <p>Download Logs</p>
    </div>
  );
}
