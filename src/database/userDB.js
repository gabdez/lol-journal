const DB_NAME = "lol-review";
const DB_VERSION = 1;
const DB_OBJECT = "User";
let DB;

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = e => {
        console.log("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = e => {
        DB = e.target.result;
        resolve(DB);
      };

      request.onupgradeneeded = e => {
        console.log("onupgradeneeded");
        let db = e.target.result;
        db.createObjectStore(DB_OBJECT, {
          autoIncrement: true,
          keyPath: "name"
        });
      };
    });
  },
  async deleteUser(user) {
    console.log(user);
    let db = await this.getDb();

    return new Promise(resolve => {
      let trans = db.transaction([DB_OBJECT], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(DB_OBJECT);
      store.delete(user.id);
    });
  },
  async getUser(userName) {
    let db = await this.getDb();

    return new Promise(resolve => {
      let trans = db.transaction([DB_OBJECT], "readonly");
      trans.oncomplete = () => {
        resolve(user);
      };

      let store = trans.objectStore(DB_OBJECT);
      let user = null;

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor && cursor.key === userName) {
          user = cursor.value;
          cursor.continue();
        }
      };
    });
  },

  async saveUser(user) {
    let db = await this.getDb();

    return new Promise(resolve => {
      let trans = db.transaction([DB_OBJECT], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(DB_OBJECT);
      store.put(user);
    });
  }
};
