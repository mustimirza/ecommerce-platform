import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductsList from "./ProductsList";
import fetchMock from "jest-fetch-mock";
import { within } from "@testing-library/react";
import App from "./App";

// After actions that open the cart modal
const cartModal = screen.getByTestId("cart-modal"); // Assume you have `data-testid="cart-modal"` on the cart modal
const cartItem = within(cartModal).getByText("Test Product");
expect(cartItem).toBeInTheDocument();

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test("adds product to cart and verifies cart content", async () => {
  // Mock responses for initial product loading and any other necessary data
  fetch.mockResponses(
    JSON.stringify([{ id: 1, title: "iPhone 9", price: 549 }]),
    JSON.stringify([{ id: 2, title: "iPhone X", price: 899 }])
  );

  // Render the entire app to have access to both products list and cart
  render(<App />);

  // Wait for the "iPhone X" product to appear and click "Add to Cart" button next to it
  const product = await screen.findByText("iPhone X");
  expect(product).toBeInTheDocument();

  const addButton = screen.getByRole("button", { name: "Add to Cart" }); // Adjust if your button text is different
  userEvent.click(addButton);

  // Click the button to view the cart, assuming it toggles cart visibility
  const viewCartButton = screen.getByRole("button", { name: "View Cart" }); // Adjust the name based on your actual button
  userEvent.click(viewCartButton);

  // Verify the cart modal is now visible and contains the added product
  expect(await screen.findByText("iPhone X")).toBeInTheDocument();
  expect(await screen.findByText("Price: $899")).toBeInTheDocument(); // Adjust text/format as needed

  // Verify quantity if displayed in the cart
  expect(await screen.findByText("Quantity: 1")).toBeInTheDocument(); // Adjust based on your actual text/format
});
