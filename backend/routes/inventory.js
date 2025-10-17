const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory');

// GET all inventory items
router.get('/', (req, res) => {
  Inventory.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET single inventory item
router.get('/:id', (req, res) => {
  Inventory.getById(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(results[0]);
  });
});

// POST create new inventory item
router.post('/', (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  
  if (!name || !category || !quantity || !price) {
    return res.status(400).json({ error: 'Name, category, quantity, and price are required' });
  }

  Inventory.create(req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// PUT update inventory item
router.put('/:id', (req, res) => {
  Inventory.update(req.params.id, req.body, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully' });
  });
});

// DELETE inventory item
router.delete('/:id', (req, res) => {
  Inventory.delete(req.params.id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  });
});

module.exports = router;