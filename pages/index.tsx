import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";
import { Alert } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
  };
  // let error go to 500 page
};

export default function BreakingNewsPage({
  newsArticles,
}: BreakingNewsPageProps) {
  return (
    <main className={inter.className}>
      <h1>Breaking News</h1>
      <Alert>
        This page uses <strong>getServerSideProps</strong> to fetch data
        server-side on every request. This allows search engines to crawl the
        page content and <strong>improves SEO</strong>.
      </Alert>
      <NewsArticlesGrid articles={newsArticles} />
    </main>
  );
}
