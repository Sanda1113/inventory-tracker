import React from 'react';
import InventoryItem from './InventoryItem';

const InventoryList = ({ inventory, onEdit, onDelete }) => {
  if (inventory.length === 0) {
    return (
      <div className="inventory-list">
        <div className="inventory-item">
          <p style={{ textAlign: 'center', color: '#666' }}>
            No inventory items found. Add your first item to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-list">
      {inventory.map(item => (
        <InventoryItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default InventoryList;