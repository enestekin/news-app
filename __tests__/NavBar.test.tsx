import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "@/components/NavBar";

describe("NavBar Component", () => {
  it("should render links correctly", () => {
    render(<NavBar />);
    const breakingLink = screen.getByText(/Breaking/i);
    const searchLink = screen.getByText(/Search/i);
    const categoriesDropdown = screen.getByText(/Categories/i);

    expect(breakingLink).toBeInTheDocument();
    expect(breakingLink).toHaveAttribute("href", "/");
    expect(searchLink).toBeInTheDocument();
    expect(searchLink).toHaveAttribute("href", "/search");
    expect(categoriesDropdown).toBeInTheDocument();
  });

  it("should toggle the dropdown items when clicked", async () => {
    render(<NavBar />);
    const dropdownElement = screen.getByText(/categories/i);

    await userEvent.click(dropdownElement);
    expect(dropdownElement).toHaveClass("show");

    await userEvent.click(dropdownElement);
    expect(dropdownElement).not.toHaveClass("show");
  });
});
