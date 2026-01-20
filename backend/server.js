import express from 'express'
import cors from 'cors'

const app = express();


app.use(cors());
app.use(express.json()); // Allows the server to read JSON data

// 1. Mock Data (This will eventually move to your Database/Admin Panel)
const springInventory = [
    { holeSize: 10, type: "Standard Thread", pricePerHole: 5.00 },
    { holeSize: 15, type: "Heavy Duty", pricePerHole: 8.50 },
    { holeSize: 20, type: "Industrial Grade", pricePerHole: 12.00 }
];

// 2. The Calculation Route
app.post('/api/calculate', (req, res) => {
    const { holeSize, quantity, labourCharge, travelCharge, fuelCharge } = req.body;

    // Find the correct spring based on hole size
    const selectedSpring = springInventory.find(s => s.holeSize === parseInt(holeSize));

    if (!selectedSpring) {
        return res.status(404).json({ error: "Spring size not found" });
    }

    // Engineering Logic
    const springTotal = selectedSpring.pricePerHole * quantity;
    const additionalCharges = (labourCharge || 0) + (travelCharge || 0) + (fuelCharge || 0);
    const grandTotal = springTotal + additionalCharges;

    // Send the result back to the frontend
    res.json({
        springType: selectedSpring.type,
        pricePerUnit: selectedSpring.pricePerHole,
        totalSpringCost: springTotal,
        additionalCharges: additionalCharges,
        grandTotal: grandTotal
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));