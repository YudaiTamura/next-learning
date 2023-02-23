import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "../../components/Header";

it("components/Header", () => {
  render(<Header />);
  const pageList = ["Home", "Main", "Blog", "Task", "Contact"];
  pageList.forEach((pageName) => {
    expect(screen.getByText(pageName)).toBeInTheDocument();
  });
});
