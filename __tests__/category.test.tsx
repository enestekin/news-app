import { render, screen } from "@testing-library/react";
import CategoryNewsPage, {
  getStaticPaths,
} from "@/pages/categories/[category]";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      category: "sports",
    },
  }),
}));

describe("/api/[category]", () => {
  it("should return an array of category paths getStaticPaths", async () => {
    const expectedPaths = [
      { params: { category: "business" } },
      { params: { category: "entertainment" } },
      { params: { category: "general" } },
      { params: { category: "health" } },
      { params: { category: "science" } },
      { params: { category: "sports" } },
      { params: { category: "technology" } },
    ];
    const result = await getStaticPaths({});
    expect(result.paths).toEqual(expectedPaths);
    expect(result.fallback).toBe(false);
  });

  it("renders the page title and news articles", () => {
    const mockData = {
      articles: [
        {
          author: "Test Author",
          title: "Test Title",
          description: "Test Description",
          url: "http://test-url.com",
          urlToImage: "http:/test-url-to-image.com",
          publishedAt: "Test Date",
          content: "Test Content",
        },
      ],
    };

    render(<CategoryNewsPage newsArticles={mockData.articles} />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Category: sports"
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
