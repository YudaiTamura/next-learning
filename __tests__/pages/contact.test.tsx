import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Contact from "../../pages/contact";

it("pages/contact", () => {
  render(<Contact />);
  expect(screen.getByText("Tokyo")).toBeInTheDocument();
  expect(screen.getByText("sample@test.com")).toBeInTheDocument();
  expect(screen.getByText("000-1111-2222")).toBeInTheDocument();
});
