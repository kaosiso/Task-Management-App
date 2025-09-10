// tests/auth.test.js
import request from "supertest";
import app from "../app.js"; // Your Express app
import "./setup.js"; // MongoMemoryServer setup

describe("Auth API", () => {
  const userData = {
    name: "Test User",
    email: "test@example.com",
    password: "123456",
  };

  // --------------------------
  // REGISTER
  // --------------------------
  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/auth/register").send(userData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.message).toBe("User registered");
    });

    it("should not allow registering with an existing email", async () => {
      // First registration
      await request(app).post("/auth/register").send(userData);

      // Second registration attempt
      const res = await request(app).post("/auth/register").send(userData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("Email already in use");
    });

    it("should require all fields", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send({ email: "incomplete@test.com" }); // missing name & password

      expect(res.status).toBe(400);
      expect(res.body.message).toBe("All fields required");
    });
  });

  // --------------------------
  // LOGIN
  // --------------------------
  describe("POST /auth/login", () => {
    beforeEach(async () => {
      // Ensure a user exists to login
      await request(app).post("/auth/register").send(userData);
    });

    it("should login with correct credentials", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: userData.email, password: userData.password });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.message).toBe("User logged in");
    });

    it("should fail login with wrong password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: userData.email, password: "wrongpassword" });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid credentials");
    });

    it("should fail login for non-existent user", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({ email: "nouser@test.com", password: "123456" });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid credentials");
    });
  });
});
