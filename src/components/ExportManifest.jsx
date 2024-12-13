import addLogEntry from "@/utils/addLogEntry";
import wipeState from "@/utils/wipeState";
import { useState } from "react";

const ExportManifest = ({ manifest, shipName }) => {
    const [showPopup, setShowPopup] = useState(false);

    const getFileName = (shipName) => {
        if (shipName.endsWith(".txt")) {
            return shipName.slice(0, -4);
        }
        return shipName;
    };

    const formatManifestContent = (manifest) => {
        return manifest
            .slice(0, 96)
            .map((item) => {
                const paddedRow = String(item.row).padStart(2, "0");
                const paddedCol = String(item.col).padStart(2, "0");
                const paddedWeight = String(item.weight).padStart(5, "0");

                return `[${paddedRow},${paddedCol}], {${paddedWeight}}, ${item.name}`;
            })
            .join("\n");
    };

    const handleExport = () => {
        const filename = `${getFileName(shipName)}OUTBOUND.txt`;
        const fileContent = formatManifestContent(manifest);

        const blob = new Blob([fileContent], { type: "text/plain" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);

        link.click();
        document.body.removeChild(link);

        addLogEntry("Finished a Cycle. Manifest " + filename + " was written to desktop, and a reminder pop-up to operator to send file was displayed.");

    };

    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        wipeState();
        window.location.reload();
    }

    return (
        <div>
            <button
                onClick={handleOpenPopup}
                className="px-4 py-2 bg-ibm-yellow text-black font-medium rounded shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            >
                Export Manifest
            </button>

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl text-ibm-gray font-bold mb-4">Reminder</h2>
                        <p className="text-black mb-6">
                            Don&apos;t forget to email the new manifest!
                        </p>
                        <div className="space-x-4">
                            <button
                                onClick={handleExport}
                                className="px-4 py-2 bg-ibm-green text-black font-medium rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                            >
                                Download Manifest
                            </button>
                            <button
                                onClick={handleClosePopup}
                                className="px-4 py-2 bg-ibm-gray text-white font-medium rounded shadow hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExportManifest;