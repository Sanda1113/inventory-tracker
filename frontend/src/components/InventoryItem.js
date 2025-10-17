import React from 'react';

const InventoryItem = ({ item, onEdit, onDelete }) => {
  const getQuantityClass = (quantity) => {
    if (quantity > 50) return 'quantity-high';
    if (quantity > 10) return 'quantity-medium';
    return 'quantity-low';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="inventory-item">
      <div className="item-header">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-category">{item.category}</span>
      </div>

      <div className="item-details">
        <div className="detail">
          <div className="detail-label">Quantity</div>
          <div className={`detail-value ${getQuantityClass(item.quantity)}`}>
            {item.quantity}
          </div>
        </div>
        
        <div className="detail">
          <div className="detail-label">Price</div>
          <div className="detail-value">{formatPrice(item.price)}</div>
        </div>
        
        <div className="detail">
          <div className="detail-label">Total Value</div>
          <div className="detail-value">
            {formatPrice(item.quantity * item.price)}
          </div>
        </div>
      </div>

      {item.description && (
        <div className="item-description">
          <strong>Description:</strong> {item.description}
        </div>
      )}

      <div className="item-actions">
        <button 
          className="btn btn-edit"
          onClick={() => onEdit(item)}
        >
          Edit
        </button>
        <button 
          className="btn btn-danger"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;