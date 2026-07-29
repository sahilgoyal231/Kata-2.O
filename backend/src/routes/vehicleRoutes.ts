import { Router, Response } from 'express';
import { Vehicle } from '../models/Vehicle';
import { authenticate, authorizeAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all vehicles
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Search vehicles
router.get('/search', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { make, model, category, minPrice, maxPrice } = req.query;
    let query: any = {};

    if (make) query.make = new RegExp(make as string, 'i');
    if (model) query.model = new RegExp(model as string, 'i');
    if (category) query.category = new RegExp(category as string, 'i');
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(query);
    res.json(vehicles);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Create a vehicle (Admin)
router.post('/', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const vehicle = new Vehicle(req.body);
    const savedVehicle = await vehicle.save();
    res.status(201).json(savedVehicle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Update a vehicle (Admin)
router.put('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(updatedVehicle);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a vehicle (Admin)
router.delete('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Purchase a vehicle (Customer or Admin)
router.post('/:id/purchase', authenticate, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const amount = req.body.amount || 1;
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    if (vehicle.quantity < amount) return res.status(400).json({ message: 'Insufficient stock' });
    
    vehicle.quantity -= amount;
    await vehicle.save();
    
    res.json({ message: 'Purchase successful', vehicle });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Restock a vehicle (Admin)
router.post('/:id/restock', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const amount = req.body.amount || 1;
    const vehicle = await Vehicle.findById(req.params.id);
    
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    
    vehicle.quantity += amount;
    await vehicle.save();
    
    res.json({ message: 'Restock successful', vehicle });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
