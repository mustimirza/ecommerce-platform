// Importing necessary libraries and components
import "./App.css"; // Importing custom CSS for styling
import ProductsList from "./components/ProductsList"; // Importing the ProductsList component to display products
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap for styling
import React, { useState } from "react"; // Importing React and the useState hook for state management
import { Modal, Button } from "react-bootstrap"; // Importing specific components from react-bootstrap for UI elements
import { ShoppingCartOutlined } from "@ant-design/icons"; // Importing a shopping cart icon from Ant Design icons
import Cart from "./components/Cart"; // Importing the Cart component to display the shopping cart

// Defining the main App component
function App() {
  const [cart, setCart] = useState({}); // Initializing the cart state as an empty object to store cart items
  const [showCart, setShowCart] = useState(false); // State to manage the visibility of the cart modal

  // Function to toggle the cart modal's visibility
  const toggleCart = () => setShowCart(!showCart);

  // Function to add items to the cart
  const addToCart = (productId, productTitle, productPrice) => {
    // Using the previous cart state to update it
    setCart((prevCart) => {
      const newCart = { ...prevCart }; // Creating a copy of the previous cart state
      if (newCart[productId]) {
        // If the product already exists in the cart, increase its quantity
        newCart[productId].quantity += 1;
      } else {
        // If the product is not in the cart, add it with initial quantity and price
        newCart[productId] = {
          title: productTitle,
          quantity: 1,
          price: productPrice,
        };
      }
      return newCart; // Returning the updated cart state
    });
  };

  // Function to remove items from the cart
  const removeFromCart = (productId) => {
    // Using the current cart state to update it
    setCart((currentCart) => {
      const newCart = { ...currentCart }; // Creating a copy of the current cart state
      delete newCart[productId]; // Removing the specified product from the cart
      return newCart; // Returning the updated cart state
    });
  };

  // Rendering the App component
  return (
    <div className="App">
      <Button
        variant="outline-primary"
        className="position-fixed top-0 end-0 m-3"
        onClick={toggleCart}
      >
        {/* Rendering the shopping cart icon */}
        <ShoppingCartOutlined />
      </Button>
      <Modal show={showCart} onHide={toggleCart}>
        <Modal.Header closeButton>
          <Modal.Title>Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cart cart={cart} addToCart={addToCart} setCart={setCart} />
          {/* Passing cart, addToCart, and setCart props to the Cart component */}
        </Modal.Body>
      </Modal>
      <ProductsList
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />{" "}
      {/* // Passing cart, addToCart, and removeFromCart props to the ProductsList
      component */}
    </div>
  );
}

export default App; // Exporting the App component for use in other parts of the application
