const { v4: uuidv4 } = require("uuid");
const { create, edit, find, remove, allItems } = require("../db");

const createItem = async (request, response) => {
  try {
    const { title } = request.body;
    const itemId = process.env.NODE_ENV === "test" ? "1" : uuidv4();
    const item = { title, itemId, completed: false };
    const created = await create(item);
    if (created) {
      const { items } = await allItems();
      return response.status(201).send({ items, item });
    }

    return response.sendStatus(500);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

const getItems = async (_, response) => {
  try {
    const { items } = await allItems();

    if (items) {
      return response.status(200).send({ items });
    }

    return response.sendStatus(500);
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

const updateItem = async (request, response) => {
  try {
    const { itemId } = request.params;
    const item = request.body;
    const edited = await edit(itemId, item);

    if (edited) {
      const { items } = await allItems();
      return response.status(200).json({ items, item });
    }

    return response.sendStatus(500);
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

const deleteItem = async (request, response) => {
  try {
    const { itemId } = request.params;
    const item = request.body;
    const deleted = await remove(itemId);

    if (deleted) {
      const items = await allItems();
      return response.status(200).json({ items, item });
    }

    return response.sendStatus(500);
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

const getItem = async (request, response) => {
  try {
    const { itemId } = request.params;
    const item = await find(itemId);

    if (item) {
      return response.status(200).json({ item });
    }

    return response.sendStatus(404);
  } catch (error) {
    return response.status(500).send(error.message);
  }
};

module.exports = {
  createItem,
  deleteItem,
  getItems,
  getItem,
  updateItem
};
