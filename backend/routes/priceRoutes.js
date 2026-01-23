import express from 'express';
import CoilPrice from '../models/CoilPrice.js';
import auth from '../middleware/authMiddleware.js'; // 🔒 The Security Guard

const router = express.Router();

// GET: Anyone can see prices (so you can show them on your website later)
router.get('/', async (req, res) => {
  try {
    const prices = await CoilPrice.find();
    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add new item (🔒 Admin Only)
router.post('/', auth, async (req, res) => {
  const { name, details, price } = req.body;
  try {
    const newItem = new CoilPrice({ name, details, price });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Edit existing item (🔒 Admin Only)
router.put('/:id', auth, async (req, res) => {
  const { name, details, price } = req.body;
  try {
    const updatedItem = await CoilPrice.findByIdAndUpdate(
      req.params.id, 
      { name, details, price }, 
      { new: true } // Return the updated version
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove item (🔒 Admin Only)
router.delete('/:id', auth, async (req, res) => {
  try {
    await CoilPrice.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;