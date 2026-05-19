import { useEffect, useRef } from "react";

// IntersectionObserver de trigger load trang tiep theo khi sentinel vao viewport.
const useInfiniteScroll = (onLoadMore, enabled = true) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) onLoadMore();
    }, { threshold: 0.6 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [enabled, onLoadMore]);

  return ref;
};

export default useInfiniteScroll;
