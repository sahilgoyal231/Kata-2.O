import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Vehicle } from '../models/Vehicle';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/car_dealership';

const vehiclesData = [
  { make: 'Tesla', model: 'Model S Plaid', category: 'Sedan', powertrain: 'Electric (Tri-Motor)', year: 2024, price: 89990, quantity: 5, search: 'Tesla Model S Plaid' },
  { make: 'Tesla', model: 'Model 3 Performance', category: 'Sedan', powertrain: 'Electric (Dual-Motor)', year: 2024, price: 54990, quantity: 12, search: 'Tesla Model 3' },
  { make: 'Tesla', model: 'Model X Plaid', category: 'SUV', powertrain: 'Electric (Tri-Motor)', year: 2024, price: 94990, quantity: 3, search: 'Tesla Model X' },
  { make: 'Tesla', model: 'Cybertruck Cyberbeast', category: 'Truck', powertrain: 'Electric (Tri-Motor)', year: 2024, price: 99990, quantity: 2, search: 'Tesla Cybertruck' },
  { make: 'Porsche', model: '911 GT3 RS', category: 'Coupe', powertrain: '4.0L Flat-6', year: 2024, price: 241300, quantity: 1, search: 'Porsche 911 GT3 RS 992' },
  { make: 'Porsche', model: 'Taycan Turbo S', category: 'Sedan', powertrain: 'Electric (Dual-Motor)', year: 2024, price: 194900, quantity: 4, search: 'Porsche Taycan Turbo S' },
  { make: 'Porsche', model: 'Cayenne Turbo GT', category: 'SUV', powertrain: '4.0L V8 Twin-Turbo', year: 2024, price: 196300, quantity: 2, search: 'Porsche Cayenne' },
  { make: 'Rivian', model: 'R1S', category: 'SUV', powertrain: 'Electric (Quad-Motor)', year: 2024, price: 74900, quantity: 8, search: 'Rivian R1S' },
  { make: 'Rivian', model: 'R1T', category: 'Truck', powertrain: 'Electric (Quad-Motor)', year: 2024, price: 73000, quantity: 5, search: 'Rivian R1T' },
  { make: 'BMW', model: 'M5 Competition', category: 'Sedan', powertrain: '4.4L V8 Twin-Turbo', year: 2023, price: 130000, quantity: 3, search: 'BMW M5 Competition' },
  { make: 'BMW', model: 'M3 Competition', category: 'Sedan', powertrain: '3.0L I6 Twin-Turbo', year: 2024, price: 80200, quantity: 6, search: 'BMW M3 Competition' },
  { make: 'BMW', model: 'X5 M Competition', category: 'SUV', powertrain: '4.4L V8 Twin-Turbo', year: 2024, price: 122300, quantity: 4, search: 'BMW X5 M' },
  { make: 'Audi', model: 'RS e-tron GT', category: 'Sedan', powertrain: 'Electric (Dual-Motor)', year: 2024, price: 147100, quantity: 2, search: 'Audi RS e-tron GT' },
  { make: 'Audi', model: 'RS6 Avant', category: 'Wagon', powertrain: '4.0L V8 Twin-Turbo', year: 2024, price: 125800, quantity: 3, search: 'Audi RS6 Avant' },
  { make: 'Audi', model: 'R8 V10 Performance', category: 'Coupe', powertrain: '5.2L V10', year: 2023, price: 158600, quantity: 1, search: 'Audi R8 V10 Performance' },
  { make: 'Mercedes-Benz', model: 'G-Class G63 AMG', category: 'SUV', powertrain: '4.0L V8 BiTurbo', year: 2024, price: 179000, quantity: 2, search: 'Mercedes-Benz G63 AMG' },
  { make: 'Mercedes-Benz', model: 'AMG GT 63', category: 'Coupe', powertrain: '4.0L V8 BiTurbo', year: 2024, price: 149000, quantity: 1, search: 'Mercedes-AMG GT' },
  { make: 'Mercedes-Benz', model: 'S-Class S580', category: 'Sedan', powertrain: '4.0L V8 Mild-Hybrid', year: 2024, price: 117300, quantity: 4, search: 'Mercedes-Benz S580' },
  { make: 'Ford', model: 'Mustang Shelby GT500', category: 'Coupe', powertrain: '5.2L Supercharged V8', year: 2022, price: 79900, quantity: 3, search: 'Mustang Shelby GT500 2020' },
  { make: 'Ford', model: 'F-150 Raptor R', category: 'Truck', powertrain: '5.2L Supercharged V8', year: 2024, price: 109145, quantity: 5, search: 'Ford F-150 Raptor' },
  { make: 'Chevrolet', model: 'Corvette Z06', category: 'Coupe', powertrain: '5.5L Flat-Plane V8', year: 2024, price: 112700, quantity: 2, search: 'Chevrolet Corvette C8 Z06' },
  { make: 'Chevrolet', model: 'Camaro ZL1', category: 'Coupe', powertrain: '6.2L Supercharged V8', year: 2023, price: 73695, quantity: 3, search: 'Chevrolet Camaro ZL1' },
  { make: 'Lamborghini', model: 'Huracan Evo', category: 'Coupe', powertrain: '5.2L V10', year: 2023, price: 248295, quantity: 1, search: 'Lamborghini Huracan Evo' },
  { make: 'Lamborghini', model: 'Urus Performante', category: 'SUV', powertrain: '4.0L V8 Twin-Turbo', year: 2024, price: 260000, quantity: 1, search: 'Lamborghini Urus' },
  { make: 'Ferrari', model: 'F8 Tributo', category: 'Coupe', powertrain: '3.9L V8 Twin-Turbo', year: 2023, price: 280900, quantity: 1, search: 'Ferrari F8 Tributo' },
  { make: 'Ferrari', model: 'SF90 Stradale', category: 'Coupe', powertrain: '4.0L V8 PHEV', year: 2024, price: 507000, quantity: 1, search: 'Ferrari SF90 Stradale' },
  { make: 'Toyota', model: 'Land Cruiser', category: 'SUV', powertrain: '3.4L V6 Twin-Turbo', year: 2024, price: 55950, quantity: 10, search: 'Toyota Land Cruiser 300' },
  { make: 'Toyota', model: 'GR Supra', category: 'Coupe', powertrain: '3.0L I6 Turbo', year: 2024, price: 54500, quantity: 6, search: 'Toyota GR Supra' },
];

async function searchCommonsImage(query: string, retryCount = 0): Promise<string> {
  try {
    // Removed the broken Filetype:bitmap prefix!
    const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;
    
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'KataMotorsSeedScript/1.0 (dealership@example.com)'
      }
    });
    
    if (!res.ok) {
      console.log(`[API Error] HTTP ${res.status}`);
      throw new Error('Wikipedia API rejected request');
    }

    const data = await res.json();
    
    if (data.query && data.query.pages) {
      const pages = Object.values(data.query.pages) as any[];
      // Look for the first image that is a JPG or PNG (filters out SVGs or weird files)
      const validImage = pages.find(p => p.imageinfo && p.imageinfo.length > 0 && (p.imageinfo[0].thumburl.toLowerCase().includes('.jpg') || p.imageinfo[0].thumburl.toLowerCase().includes('.png')));
      
      if (validImage) {
        return validImage.imageinfo[0].thumburl; 
      }
    }
    
    if (retryCount === 0) {
      // Very broad fallback search (e.g. "BMW M5")
      const broaderQuery = query.split(' ').slice(0, 2).join(' '); 
      console.log(`  -> No results for "${query}", retrying with "${broaderQuery}"...`);
      return await searchCommonsImage(broaderQuery, 1);
    }
    
    console.log(`  -> Still no results for "${query}" after retry.`);
  } catch (err: any) {
    console.error(`  -> Fetch Failed: ${err.message}`);
  }
  
  return 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop';
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for Seeding...');

    await Vehicle.deleteMany({});
    console.log('Cleared existing inventory. Initiating precise image scraping from Wikimedia Commons...');

    const processedVehicles = [];
    let count = 1;

    for (const v of vehiclesData) {
      process.stdout.write(`[${count}/${vehiclesData.length}] Fetching ${v.search}... `);
      
      await new Promise(resolve => setTimeout(resolve, 800));

      const imageUrl = await searchCommonsImage(v.search);
      
      if (imageUrl.includes('unsplash')) {
        console.log('❌ Failed (using fallback)');
      } else {
        console.log('✅ Success!');
      }
      
      processedVehicles.push({
        make: v.make,
        model: v.model,
        category: v.category,
        powertrain: v.powertrain,
        year: v.year,
        price: v.price,
        quantity: v.quantity,
        imageUrl: imageUrl
      });
      count++;
    }

    await Vehicle.insertMany(processedVehicles);
    console.log(`\n🎉 Successfully seeded ${processedVehicles.length} vehicles!`);

    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database:', err);
    process.exit(1);
  }
};

seedDatabase();
