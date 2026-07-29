import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';
import { Vehicle } from '../models/Vehicle';
import { User } from '../models/User';

let mongoServer: MongoMemoryServer;
let adminToken: string;
let customerToken: string;

describe('Vehicle Endpoints', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create Admin User
    const adminRes = await request(app).post('/api/auth/register').send({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
    });
    
    // Manually update role to admin in DB since register defaults to customer
    await User.updateOne({ email: 'admin@example.com' }, { role: 'admin' });
    
    // Re-login to get admin token
    const adminLoginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'password123',
    });
    adminToken = adminLoginRes.body.token;

    // Create Customer User
    const customerRes = await request(app).post('/api/auth/register').send({
      name: 'Customer User',
      email: 'customer@example.com',
      password: 'password123',
    });
    customerToken = customerRes.body.token;
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Vehicle.deleteMany({});
  });

  describe('POST /api/vehicles', () => {
    it('should allow admin to create a vehicle', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          make: 'Toyota',
          model: 'Corolla',
          category: 'Sedan',
          price: 25000,
          quantity: 5,
          year: 2024,
          powertrain: 'Gasoline',
          imageUrl: 'https://test.com/toyota.jpg'
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body.make).toBe('Toyota');
    });

    it('should not allow customer to create a vehicle', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          make: 'Toyota',
          model: 'Corolla',
          category: 'Sedan',
          price: 25000,
          quantity: 5,
          year: 2024,
          powertrain: 'Gasoline',
          imageUrl: 'https://test.com/toyota.jpg'
        });

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/vehicles', () => {
    it('should list all vehicles', async () => {
      await Vehicle.create({ make: 'Honda', model: 'Civic', category: 'Sedan', price: 22000, quantity: 3, year: 2024, powertrain: 'Gasoline', imageUrl: 'test.jpg' });
      await Vehicle.create({ make: 'Ford', model: 'Mustang', category: 'Coupe', price: 35000, quantity: 2, year: 2023, powertrain: 'Gasoline', imageUrl: 'test2.jpg' });

      const res = await request(app)
        .get('/api/vehicles')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/vehicles/search', () => {
    beforeEach(async () => {
      await Vehicle.create([
        { make: 'Honda', model: 'Civic', category: 'Sedan', price: 22000, quantity: 3, year: 2024, powertrain: 'Gasoline', imageUrl: 'test.jpg' },
        { make: 'Ford', model: 'Mustang', category: 'Coupe', price: 35000, quantity: 2, year: 2023, powertrain: 'Gasoline', imageUrl: 'test2.jpg' },
        { make: 'Honda', model: 'CR-V', category: 'SUV', price: 28000, quantity: 4, year: 2024, powertrain: 'Hybrid', imageUrl: 'test3.jpg' },
      ]);
    });

    it('should search vehicles by make', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?make=Honda')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('should search vehicles by max price', async () => {
      const res = await request(app)
        .get('/api/vehicles/search?maxPrice=25000')
        .set('Authorization', `Bearer ${customerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].model).toBe('Civic');
    });
  });

  describe('PUT /api/vehicles/:id', () => {
    it('should allow admin to update a vehicle', async () => {
      const vehicle = await Vehicle.create({ make: 'Honda', model: 'Civic', category: 'Sedan', price: 22000, quantity: 3, year: 2024, powertrain: 'Gasoline', imageUrl: 'test.jpg' });

      const res = await request(app)
        .put(`/api/vehicles/${vehicle._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ price: 21000 });

      expect(res.status).toBe(200);
      expect(res.body.price).toBe(21000);
    });
  });

  describe('DELETE /api/vehicles/:id', () => {
    it('should allow admin to delete a vehicle', async () => {
      const vehicle = await Vehicle.create({ make: 'Honda', model: 'Civic', category: 'Sedan', price: 22000, quantity: 3, year: 2024, powertrain: 'Gasoline', imageUrl: 'test.jpg' });

      const res = await request(app)
        .delete(`/api/vehicles/${vehicle._id}`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      const exists = await Vehicle.findById(vehicle._id);
      expect(exists).toBeNull();
    });
  });
});
