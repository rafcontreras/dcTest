const server = require("./server");
const createDocs = require("./scripts/createDocs")

createDocs();
server();
