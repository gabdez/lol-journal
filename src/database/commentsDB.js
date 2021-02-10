const DB_NAME = "lol-review";
const DB_VERSION = 1;
const DB_OBJECT = "Comment";
let DB;

export default {
  async getDb() {
    return new Promise((resolve, reject) => {
      if (DB) {
        return resolve(DB);
      }
      console.log("OPENING DB", DB);
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
        db.createObjectStore(DB_OBJECT, { autoIncrement: true, keyPath: "id" });
      };
    });
  },
  async deleteComment(comment) {
    let db = await this.getDb();

    return new Promise(resolve => {
      let trans = db.transaction([DB_OBJECT], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(DB_OBJECT);
      store.delete(comment.id);
    });
  },
  async getComments() {
    let db = await this.getDb();

    return new Promise(resolve => {
      let trans = db.transaction([DB_OBJECT], "readonly");
      trans.oncomplete = () => {
        resolve(comments);
      };

      let store = trans.objectStore(DB_OBJECT);
      let comments = [];

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          comments.push(cursor.value);
          cursor.continue();
        }
      };
    });
  },

  async saveComment(comment) {
    let db = await this.getDb();

    return new Promise(resolve => {
      let trans = db.transaction([DB_OBJECT], "readwrite");
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore(DB_OBJECT);
      store.put(comment);
    });
  }
};
