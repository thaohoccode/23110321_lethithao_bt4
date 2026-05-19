import { useEffect, useState } from "react";
import api from "../api/client";
import HorizontalProductCarousel from "../components/product/HorizontalProductCarousel";

const HighlightsPage = () => {
  const [data, setData] = useState({ bestSellers: [], mostViewed: [] });

  useEffect(() => {
    api.get("/products/highlights").then((res) => setData(res.data));
  }, []);

  return (
    <section className="mx-auto max-w-6xl space-y-6 px-4 py-6">
      <HorizontalProductCarousel title="Top 10 Best Sellers" products={data.bestSellers} />
      <HorizontalProductCarousel title="Top 10 Most Viewed" products={data.mostViewed} />
    </section>
  );
};

export default HighlightsPage;
