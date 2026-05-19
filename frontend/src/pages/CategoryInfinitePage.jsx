import { useCallback, useEffect, useState } from "react";
import api from "../api/client";
import ProductCard from "../components/product/ProductCard";
import ProductSkeleton from "../components/product/ProductSkeleton";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const CategoryInfinitePage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const { data } = await api.get(`/products/category/sneaker-cao-cap/infinite?page=${page}&limit=6`);
    setProducts((prev) => [...prev, ...data.data]);
    setHasMore(data.hasMore);
    setPage((p) => p + 1);
    setLoading(false);
  }, [hasMore, loading, page]);

  useEffect(() => { loadMore(); }, []);
  const sentinelRef = useInfiniteScroll(loadMore, hasMore);

  return (
    <section className="mx-auto max-w-6xl space-y-4 px-4 py-6">
      <h2 className="text-xl font-bold">San pham theo danh muc (Infinite Scroll)</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
        {loading && Array.from({ length: 3 }).map((_, i) => <ProductSkeleton key={i} />)}
      </div>
      <div ref={sentinelRef} className="h-8" />
    </section>
  );
};

export default CategoryInfinitePage;
