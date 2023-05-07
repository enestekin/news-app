import { render } from "@testing-library/react";
import NewsArticleEntry from "@/components/NewsArticleEntry";

describe("NewsArticleEntry Component", () => {
  const mockArticle = {
    title: "Test article",
    description: "This is a test description",
    url: "https://testarticle.com",
    urlToImage: "https://testimage.com",
    author: "Enes",
    publishedAt: "some date",
    content: "some content",
  };

  // it("should render the news article title", () => {
  //   render(<NewsArticleEntry article={mockArticle} />);
  //   const titleElement = screen.getByText(/Test article/i);
  //   expect(titleElement).toBeInTheDocument();
  // });

  // it("should render the news article description", () => {
  //   render(<NewsArticleEntry article={mockArticle} />);
  //   const descriptionElement = screen.getByText(/This is a test description/i);
  //   expect(descriptionElement).toBeInTheDocument();
  // });

  // it("should render the news article image", () => {
  //   render(<NewsArticleEntry article={mockArticle} />);
  //   const imageElement = screen.getByAltText(/image/i);
  //   expect(imageElement).toBeInTheDocument();
  // });

  // it("should render the news article link", () => {
  //   render(<NewsArticleEntry article={mockArticle} />);
  //   const linkElement = screen.getByTestId("link-element");
  //   expect(linkElement).toHaveAttribute("href", "https://testarticle.com");
  // });

  it("renders correctly", () => {
    const { container } = render(<NewsArticleEntry article={mockArticle} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
