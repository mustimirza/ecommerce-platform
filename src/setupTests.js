// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

// Optional: Reset mocks before each test to ensure tests are independent
beforeEach(() => {
  fetch.resetMocks();
});

test("loads and displays products", async () => {
  fetch.mockResponseOnce(
    JSON.stringify([{ id: 1, title: "iPhone 9", price: 549 }])
  );

  // Your test code that renders the component and expects certain outcomes
});
