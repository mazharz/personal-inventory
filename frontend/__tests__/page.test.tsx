import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "@/app/page";

describe("Page", () => {
  it("should render the heading", () => {
    render(<App />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
