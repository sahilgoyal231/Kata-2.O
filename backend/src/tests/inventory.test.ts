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
let testVehicleId: string;

describe('Inventory Endpoints', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Create Admin User
    await request(app).post('/api/auth/register').send({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
    });
    await User.updateOne({ email: 'admin@example.com' }, { role: 'admin' });
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
    const vehicle = await Vehicle.create({ make: 'Tesla', model: 'Model 3', category: 'Sedan', price: 40000, quantity: 2, year: 2024, powertrain: 'Electric', imageUrl: 'https://test.com/tesla.jpg' });
    testVehicleId = vehicle._id.toString();
  });

  describe('POST /api/vehicles/:id/purchase', () => {
    it('should allow a customer to purchase a vehicle and decrease quantity', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${testVehicleId}/purchase`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ amount: 1 });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Purchase successful');
      
      const updatedVehicle = await Vehicle.findById(testVehicleId);
      expect(updatedVehicle?.quantity).toBe(1);
    });

    it('should prevent purchase if quantity is insufficient', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${testVehicleId}/purchase`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ amount: 5 });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Insufficient stock');
    });
  });

  describe('POST /api/vehicles/:id/restock', () => {
    it('should allow an admin to restock a vehicle and increase quantity', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${testVehicleId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ amount: 5 });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Restock successful');
      
      const updatedVehicle = await Vehicle.findById(testVehicleId);
      expect(updatedVehicle?.quantity).toBe(7);
    });

    it('should prevent a customer from restocking a vehicle', async () => {
      const res = await request(app)
        .post(`/api/vehicles/${testVehicleId}/restock`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ amount: 5 });

      expect(res.status).toBe(403);
    });
  });
});
