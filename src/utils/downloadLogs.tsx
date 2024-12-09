// Downloads all logs of the current year as a txt file.
export default function downloadLogs() {
  // Parse through IndexedDB stringlist with all log entries and create downloadable txt.

  const currYear = new Date().getFullYear();
  const databaseName: string = "cargoflowDatabase";
  const storeName: string = "cargoflowLogs" + currYear;
  const allText: string = "";

  const dbRequest: IDBOpenDBRequest = indexedDB.open(databaseName, 1);

  dbRequest.onerror = (event: any) => {
    console.error("Error opening IndexedDB database.");
  };

  dbRequest.onsuccess = (event: any) => {
    const db: IDBDatabase = event.target.result;
    const transaction: IDBTransaction = db.transaction(storeName, "readonly");
    const objectStore: IDBObjectStore = transaction.objectStore(storeName);

    const getRequest: IDBRequest = objectStore.get(storeName);

    getRequest.onerror = (event: any) => {
      console.log("Error getting objectStore request.");
    };

    getRequest.onsuccess = (event: any) => {
      console.log("taco success")
      const result = event.target.result;
      let textContent: string = "";

      if (result !== undefined) {
        const stringlist: string[] = result.stringlist;

        stringlist.forEach((s: string) => {
          textContent += s + "\n";
        });
      }

      const dataURL: string = `data:text/plain;charset=utf-8,${encodeURIComponent(
        textContent
      )}`;
      const link: HTMLAnchorElement = document.createElement("a");
      link.href = dataURL;
      link.download = "Cargoflow" + currYear + ".txt";
      link.click();
    };
  };
}
