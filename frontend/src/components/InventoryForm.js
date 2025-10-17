import React, { useState, useEffect } from 'react';

const InventoryForm = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || '',
        category: item.category || '',
        quantity: item.quantity || '',
        price: item.price || '',
        description: item.description || ''
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.category || !formData.quantity || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }

    // Convert quantity and price to numbers
    const submitData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price)
    };

    onSubmit(submitData);
  };

  return (
    <form className="inventory-form" onSubmit={handleSubmit}>
      <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Item Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category *</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Home & Garden">Home & Garden</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity *</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="0"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Price ($) *</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {item ? 'Update Item' : 'Add Item'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default InventoryForm;