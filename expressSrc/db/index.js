const lowdb = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const dbFile = process.env.NODE_ENV === "test" ? "itemsTest" : "items";
const dbAdapter = new FileAsync(`./data/${dbFile}.json`);

const find = async itemId => {
  const found = await lowdb(dbAdapter)
    .then(async db => db.get("items").find({ itemId: itemId }).value())
    .catch(() => null);

  return found;
};

const create = async item => {
  const created = await lowdb(dbAdapter)
    .then(async db => {
      const added = await db.get("items").push(item).write();
      if (added) {
        return true;
      }
      return false;
    })
    .catch(() => false);
  return created;
};

const edit = async (itemId, item) => {
  const edited = await lowdb(dbAdapter)
    .then(async db => {
      const { title, completed } = item;
      const modified = await db
        .get("items")
        .find({ itemId })
        .assign({ title, completed })
        .write();

      if (modified) {
        return true;
      }
      return false;
    })
    .catch(() => false);

  return edited;
};

const remove = async itemId => {
  const removed = await lowdb(dbAdapter)
    .then(async db => {
      await db.get("items").remove({ itemId: itemId }).write();
      return true;
    })
    .catch(() => false);
  return removed;
};

const allItems = async () => {
  const items = await lowdb(dbAdapter)
    .then(db => db.value())
    .catch(() => null);

  return items;
};

module.exports = { create, edit, find, remove, allItems };
