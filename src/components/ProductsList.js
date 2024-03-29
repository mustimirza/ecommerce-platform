import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  fetchProducts,
  fetchProductCategories,
  fetchProductsByCategory,
} from "../services/api";
import "./ProductsList.css";

const ProductsList = ({ cart, addToCart, removeFromCart }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryFilteredProducts, setCategoryFilteredProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);

  useEffect(() => {
    // Fetch initial data for products and categories upon component mount.
    const initData = async () => {
      const fetchedProducts = await fetchProducts();
      const fetchedCategories = await fetchProductCategories();
      setProducts(fetchedProducts);
      setCategoryFilteredProducts(fetchedProducts); // All products are initially considered filtered by category.
      setCategories(fetchedCategories);
      setDisplayProducts(fetchedProducts); // Ensure all products are displayed initially.
    };
    initData();
  }, []);

  // Toggles the selection of categories and triggers re-fetching of products based on selected categories.
  const toggleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      const newSelectedCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      return newSelectedCategories;
    });
  };

  // Handles the logic to filter products based on selected categories.
  const handleSaveCategories = async () => {
    let filteredProducts = [];
    if (selectedCategories.length > 0) {
      // Fetches products for each selected category and combines them.
      for (const category of selectedCategories) {
        const response = await fetchProductsByCategory(category);
        const categoryProducts = response.products || [];
        filteredProducts.push(...categoryProducts);
      }
    } else {
      // If no categories are selected, all products are considered filtered.
      filteredProducts = await fetchProducts();
    }
    setCategoryFilteredProducts(filteredProducts);
    applySearchQuery(filteredProducts);
  };

  // Filters the provided list of products based on the current search query.
  const applySearchQuery = (productsToFilter) => {
    const searchFilteredProducts = productsToFilter.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayProducts(searchFilteredProducts);
  };

  useEffect(() => {
    // Applies the current search query to either all products or those filtered by selected categories.
    applySearchQuery(
      selectedCategories.length > 0 ? categoryFilteredProducts : products
    );
  }, [searchQuery]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3 mt-5">
          {/* category filters section */}
          <h5>Categories</h5>
          {categories.map((category) => (
            <div key={category} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategorySelection(category)}
              />
              <label
                className="form-check-label"
                htmlFor={`category-${category}`}
              >
                {category}
              </label>
            </div>
          ))}
          <Button onClick={handleSaveCategories} style={{ marginTop: "10px" }}>
            Save Categories
          </Button>
        </div>
        <div className="col-md-9">
          {/* products grid section */}
          <div className="mb-4 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="row">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="col-md-4 d-flex align-items-stretch"
              >
                <div className="card">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="card-img-top"
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">${product.price}</p>
                    <div className="card-action-buttons">
                      {" "}
                      {/* Ensure this class is defined in your CSS */}
                      {cart[product.id] ? (
                        <>
                          <Button
                            className="add-to-cart-btn"
                            icon={<CheckCircleOutlined />}
                            disabled
                            style={{ marginBottom: "5px", alignSelf: "center" }} // Center the button horizontally
                          >
                            Added
                          </Button>
                          <Button
                            icon={<CloseCircleOutlined />}
                            style={{ color: "red", alignSelf: "center" }} // Center the button horizontally and make it red
                            onClick={() => removeFromCart(product.id)}
                          />
                        </>
                      ) : (
                        <Button
                          className="add-to-cart-btn"
                          style={{ alignSelf: "center" }} // Center the button horizontally
                          onClick={() =>
                            addToCart(product.id, product.title, product.price)
                          }
                        >
                          Add to Cart
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
