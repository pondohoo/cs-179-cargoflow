// Adds a log entry. Each log entry is a string and the log entires are stored in a single stringlist in a single record in an IndexedDB database.
export default function addLogEntry(inputStr: string) {
  const currYear = new Date().getFullYear();
  const databaseName = "KeoghsPort" + currYear;
  const storeName: string = "cargoflowLogs" + currYear;

  const dbRequest: IDBOpenDBRequest = indexedDB.open(databaseName, 1);

  dbRequest.onupgradeneeded = (event: any) => {
    const db: IDBDatabase = event.target.result;
    const objectStore: IDBObjectStore = db.createObjectStore(storeName, {
      keyPath: "id",
    });
    objectStore.add({ id: "password", password: "admin" });
  };

  dbRequest.onsuccess = (event: any) => {
    const db: IDBDatabase = event.target.result;
    const transaction: IDBTransaction = db.transaction(storeName, "readwrite");
    const objectStore: IDBObjectStore = transaction.objectStore(storeName);

    const getRequest: IDBRequest = objectStore.get(storeName);

    getRequest.onsuccess = (event: any) => {
      const result = event.target.result;
      const currentDate: Date = new Date();
      const currentMonth: string = (currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const currentDay: string = currentDate
        .getDate()
        .toString()
        .padStart(2, "0");
      const currentYear: number = currentDate.getFullYear();
      const currentHour: string = currentDate
        .getHours()
        .toString()
        .padStart(2, "0");
      const currentMinutes: string = currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0");

      inputStr = `${currentYear}-${currentMonth}-${currentDay} ${currentHour}:${currentMinutes} ${inputStr}`;

      // Update the stringlist in current record if the record already exists.
      if (result !== undefined) {
        result.stringlist.push(inputStr);
        const putRequest: IDBRequest = objectStore.put(result);

        putRequest.onerror = (event: any) => {
          console.log("Error adding log entry and updating current record.");
        };
      } else {
        // Create the record for which the stringlist will be stored.
        const data = {
          id: storeName,
          stringlist: [inputStr],
        };

        objectStore.add(data);
      }
    };

    getRequest.onerror = (event: any) => {
      console.error("Error getting objectStore request.");
    };
  };

  dbRequest.onerror = (event: Event) => {
    console.error("Error opening IndexedDB database.");
  };
}
