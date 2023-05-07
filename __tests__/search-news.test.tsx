import handler from "@/pages/api/search-news";
import httpMocks from "node-mocks-http";

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

describe("/api/search-news Api", () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;
  });

  it("should return an error if search query is missing", async () => {
    const req = httpMocks.createRequest();

    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: "Please provide a search query",
    });
  });

  it("shound return an error if news api key is missing", async () => {
    process.env.NEWS_API_KEY = "";
    const req = httpMocks.createRequest({
      query: {
        q: "test",
      },
    });

    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: "News API key is missing",
    });
  });

  it("should return news articles", async () => {
    process.env.NEWS_API_KEY = "news-api-key";

    const req = httpMocks.createRequest({
      method: "GET",
      url: "/api/search-news",
      query: {
        q: "test",
      },
    });

    const res = httpMocks.createResponse();

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(mockData.articles);
  });
});
