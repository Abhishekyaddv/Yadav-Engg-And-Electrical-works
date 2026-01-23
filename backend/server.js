import 'dotenv/config'; // Loads variables from .env automatically
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import auth from './middleware/authMiddleware.js'; //testing
import priceRoutes from './routes/priceRoutes.js';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000", // Your Frontend URL
  credentials: true
}));

app.use('/api/prices', priceRoutes);


// 1. Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Engineering Database Connected"))
    .catch(err => console.error("❌ Database Connection Error:", err));

// 2. Coil Schema & Model
const coilSchema = new mongoose.Schema({
    type: { type: String, enum: ['New', 'Recoil'], required: true },
    size: { type: String, required: true }, 
    unitPrice: { type: Number, required: true }
});

const Coil = mongoose.model('Coil', coilSchema);

// 3. Calculation Route (The "Three Column" Logic)
app.post('/api/calculate', async (req, res) => {
    try {
        const { coilType, size, numHoles, labourCharge, travelCharge } = req.body;

        const coil = await Coil.findOne({ type: coilType, size: size });

        if (!coil) {
            return res.status(404).json({ 
                error: "Configuration not found. Please check Type and Size." 
            });
        }

        const springTotal = coil.unitPrice * numHoles;
        const extras = (Number(labourCharge) || 0) + (Number(travelCharge) || 0);
        const grandTotal = springTotal + extras;

        res.json({
            column1_Type: coil.type,
            column2_Size: coil.size,
            column3_UnitPrice: coil.unitPrice,
            calculation: {
                holes: numHoles,
                baseCost: springTotal,
                additionalCharges: extras,
                grandTotal: grandTotal
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Server Error during calculation" });
    }
});

// 4. Admin Route: Seed all 16 variations
app.get('/api/admin/seed', async (req, res) => {
    try {
        await Coil.deleteMany({}); // Clears old data so you don't get duplicates

        const sizes = ['M6', 'M8', 'M10', 'M12', 'M14', 'M16', 'M18', 'M20'];
        const seedData = [];

        sizes.forEach(s => {
            seedData.push({ type: 'New', size: s, unitPrice: 300 });    // Example price
            seedData.push({ type: 'Recoil', size: s, unitPrice: 200 }); // Example price
        });
        
        await Coil.insertMany(seedData);
        res.send("✅ Database Seeded with 16 variations (New & Recoil)");
    } catch (err) {
        res.status(500).send("Error seeding database: " + err.message);
    }
});


// GET all coils (for the Admin Table)
app.get('/api/coils', async (req, res) => {
    const coils = await Coil.find().sort({ size: 1 });
    res.json(coils);
});

// POST a new coil (Add new size/price)
app.post('/api/coils', async (req, res) => {
    try {
        const newCoil = new Coil(req.body);
        await newCoil.save();
        res.json(newCoil);
    } catch (err) {
        res.status(500).json({ error: "Failed to save" });
    }
});
// UPDATE an existing coil (Edit Price/Size)
app.put('/api/coils/:id', async (req, res) => {
    try {
        const updatedCoil = await Coil.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Return the updated document
        );
        res.json(updatedCoil);
    } catch (err) {
        res.status(500).json({ error: "Update failed" });
    }
});


// DELETE a coil
app.delete('/api/coils/:id', async (req, res) => {
    await Coil.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});


// Protected Route for Testing
app.get('/api/test-protected', auth, (req, res) => {
  res.json({ msg: "🎉 You are authorized! This is secret data." });
});

const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});