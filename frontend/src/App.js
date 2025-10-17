import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import { getInventory, createItem, updateItem, deleteItem } from './services/api';

function App() {
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const data = await getInventory();
      setInventory(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch inventory. Please check if the server is running.');
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (itemData) => {
    try {
      await createItem(itemData);
      await fetchInventory();
      setShowForm(false);
      setError('');
    } catch (err) {
      setError('Failed to create item');
      console.error('Error creating item:', err);
    }
  };

  const handleUpdate = async (itemData) => {
    try {
      await updateItem(editingItem.id, itemData);
      await fetchInventory();
      setEditingItem(null);
      setShowForm(false);
      setError('');
    } catch (err) {
      setError('Failed to update item');
      console.error('Error updating item:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
        await fetchInventory();
        setError('');
      } catch (err) {
        setError('Failed to delete item');
        console.error('Error deleting item:', err);
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setShowForm(false);
  };

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <div className="container">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="actions-bar">
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Add New Item
            </button>
          </div>

          {showForm && (
            <InventoryForm
              item={editingItem}
              onSubmit={editingItem ? handleUpdate : handleCreate}
              onCancel={handleCancel}
            />
          )}

          {loading ? (
            <div className="loading">Loading inventory...</div>
          ) : (
            <InventoryList
              inventory={inventory}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;