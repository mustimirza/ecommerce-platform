import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";

const Cart = ({ cart, setCart }) => {
  const [editQuantities, setEditQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [isSaveDisabled, setIsSaveDisabled] = useState({});

  useEffect(() => {
    // Initialize editQuantities and isSaveDisabled based on cart
    const initialQuantities = {};
    const initialDisabled = {};
    Object.entries(cart).forEach(([productId, { quantity }]) => {
      initialQuantities[productId] = quantity;
      initialDisabled[productId] = true; // Initially, saving should be disabled
    });
    setEditQuantities(initialQuantities);
    setIsSaveDisabled(initialDisabled);

    // Calculate total cost
    const total = Object.entries(cart).reduce(
      (acc, [_, { price, quantity }]) => acc + price * quantity,
      0
    );
    setTotalCost(total);
  }, [cart]);

  // Updates the edited quantity state and enables the save button if the quantity differs from the cart's current state
  const handleQuantityChange = (productId, newQuantity) => {
    setEditQuantities({ ...editQuantities, [productId]: newQuantity });
    // Enable save button if quantity is changed
    setIsSaveDisabled({
      ...isSaveDisabled,
      [productId]: newQuantity === cart[productId].quantity,
    });
  };
  // Updates the main cart state only if there are valid changes
  const saveQuantity = (productId) => {
    const quantity = parseInt(editQuantities[productId], 10);
    // Update only if quantity is changed
    if (quantity !== cart[productId].quantity) {
      if (quantity > 0) {
        setCart((currentCart) => ({
          ...currentCart,
          [productId]: { ...currentCart[productId], quantity },
        }));
      } else {
        // Remove the item if quantity is not valid
        const newCart = { ...cart };
        delete newCart[productId];
        setCart(newCart);
      }
    }
    // Disable save button again after saving
    setIsSaveDisabled({ ...isSaveDisabled, [productId]: true });
  };

  return (
    <div>
      {Object.entries(cart).map(
        ([productId, { title, quantity, price = 0 }]) => (
          <div
            key={productId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <span>{title}</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="number"
                min="1"
                value={editQuantities[productId]}
                onChange={(e) =>
                  handleQuantityChange(productId, e.target.value)
                }
                style={{ marginRight: "5px", width: "60px" }}
              />
              <Button
                icon={<SaveOutlined />}
                onClick={() => saveQuantity(productId)}
                size="small"
                disabled={isSaveDisabled[productId]}
              />
              <span style={{ marginLeft: "15px" }}>
                Price: ${price.toFixed(2)}
              </span>
            </div>
          </div>
        )
      )}
      {Object.keys(cart).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <span>Total Cost: ${totalCost.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default Cart;
