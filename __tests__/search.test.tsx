import { render, screen } from "@testing-library/react";
import SearchNewsPage from "@/pages/search";
import userEvent from "@testing-library/user-event";

describe("search", () => {
  it("should render heading", () => {
    render(<SearchNewsPage />);
    expect(
      screen.getByRole("heading", { name: /searchnewspage/i })
    ).toBeInTheDocument();
  });

  it("should display search results when form is submitted", async () => {
    const mockArticles = [
      {
        author: "Test Author",
        title: "Test Title",
        description: "Test Description",
        url: "http://test-url.com",
        urlToImage: "http:/test-url-to-image.com",
        publishedAt: "Test Date",
        content: "Test Content",
      },
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockArticles),
      })
    ) as jest.Mock;

    render(<SearchNewsPage />);

    const searchInput = screen.getByLabelText("Search Query");
    const searchButton = screen.getByRole("button", { name: "Search" });

    await userEvent.type(searchInput, "test");
    await userEvent.click(searchButton);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should display error message when fetch fails", async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject());

    render(<SearchNewsPage />);

    const searchInput = screen.getByLabelText("Search Query");
    const searchButton = screen.getByRole("button", { name: "Search" });

    await userEvent.type(searchInput, "????");
    await userEvent.click(searchButton);

    expect(
      screen.getByText("Something went wrong. Please try again")
    ).toBeInTheDocument();
  });

  it("should display 'Nothing Found. Try a different query.' message when no results are found", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;

    render(<SearchNewsPage />);

    const searchInput = screen.getByLabelText("Search Query");
    const searchButton = screen.getByRole("button", { name: "Search" });

    await userEvent.type(searchInput, "????");
    await userEvent.click(searchButton);

    expect(
      screen.getByText("Nothing Found. Try a different query.")
    ).toBeInTheDocument();
  });
});
