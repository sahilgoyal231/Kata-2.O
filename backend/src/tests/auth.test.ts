import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import { User } from '../models/User';

let mongoServer: MongoMemoryServer;

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toBe('test@example.com');
      expect(res.body.user.role).toBe('customer'); // Default role
    });

    it('should not allow duplicate emails', async () => {
      await request(app).post('/api/auth/register').send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

      const res = await request(app).post('/api/auth/register').send({
        name: 'Another User',
        email: 'test@example.com',
        password: 'password456',
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Pre-register a user for login tests
      await request(app).post('/api/auth/register').send({
        name: 'Login User',
        email: 'login@example.com',
        password: 'password123',
      });
    });

    it('should login successfully with valid credentials and set HttpOnly cookie', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'login@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe('login@example.com');
      
      // Check that refreshToken cookie is set
      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/refreshToken=.*HttpOnly.*SameSite=Lax/);
    });

    it('should fail to login with incorrect password', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'login@example.com',
        password: 'wrongpassword',
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });

  describe('POST /api/auth/refresh', () => {
    let validCookie: string;

    beforeEach(async () => {
      await request(app).post('/api/auth/register').send({
        name: 'Refresh User',
        email: 'refresh@example.com',
        password: 'password123',
      });
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'refresh@example.com',
        password: 'password123',
      });
      validCookie = loginRes.headers['set-cookie'][0];
    });

    it('should issue a new access token with a valid refresh token cookie', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', [validCookie]);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should fail if refresh token cookie is missing', async () => {
      const res = await request(app).post('/api/auth/refresh');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('No refresh token provided');
    });

    it('should fail if refresh token cookie is invalid', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .set('Cookie', ['refreshToken=invalid_token; HttpOnly']);
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid or expired refresh token');
    });
  });

  describe('POST /api/auth/logout', () => {
    let validCookie: string;

    beforeEach(async () => {
      await request(app).post('/api/auth/register').send({
        name: 'Logout User',
        email: 'logout@example.com',
        password: 'password123',
      });
      const loginRes = await request(app).post('/api/auth/login').send({
        email: 'logout@example.com',
        password: 'password123',
      });
      validCookie = loginRes.headers['set-cookie'][0];
    });

    it('should clear the refresh token cookie on successful logout', async () => {
      const res = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', [validCookie]);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
      // Should set cookie to expire immediately (Max-Age=0 or Expires past)
      const clearCookie = res.headers['set-cookie'][0];
      expect(clearCookie).toMatch(/refreshToken=;/);
    });
  });
});
