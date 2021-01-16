const createHttpServer = require("../server");
const { agent } = require("supertest");

const httpServer = createHttpServer();
const request = agent(httpServer);
const apiEndpoint = "/api/v1/shopping-list";
const itemId = 1;

afterAll(done => {
  httpServer.close(done);
});

describe("Shopping List Endpoints", () => {
  it("Should create a new item", async () => {
    const response = await request.post(`${apiEndpoint}/item`).send({
      title: "Test item is cool"
    });
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty("item");
  });

  it("Should get the item created", async () => {
    const response = await request.get(`${apiEndpoint}/item/${itemId}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("item");
    expect(response.body.item).toHaveProperty("itemId");
    expect(response.body.item).toHaveProperty("completed");
    expect(response.body.item).toHaveProperty("title");
  });

  it("Should fetch all items", async () => {
    const response = await request.get(apiEndpoint);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("items");
    expect(response.body.items).toHaveLength(1);
  });

  it("Should update the item", async () => {
    const response = await request.put(`${apiEndpoint}/item/${itemId}`).send({
      itemId,
      title: "Updated title",
      completed: true
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("item");
    expect(response.body).toHaveProperty("items");
    expect(response.body.item).toHaveProperty("title", "Updated title");
  });

  it("Should return status code 422 if db constraint is violated", async () => {
    const response = await request.post(`${apiEndpoint}/item`).send({
      content: "Lorem ipsum"
    });
    expect(response.statusCode).toEqual(422);
    expect(response.body).toHaveProperty("errors");
  });

  it("Should delete a item", async () => {
    const response = await request.delete(`${apiEndpoint}/item/${itemId}`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty("items");
  });

  it("Should respond with status code 404 if resource is not found", async () => {
    const response = await request.get(`${apiEndpoint}/item/${itemId}`);
    expect(response.statusCode).toEqual(404);
  });
});
