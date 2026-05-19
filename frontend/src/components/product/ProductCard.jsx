import { Link } from "react-router-dom";

const getFirstImage = (imagesValue) => {
  if (Array.isArray(imagesValue)) return imagesValue[0];
  if (typeof imagesValue === "string") {
    const trimmed = imagesValue.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("http")) return trimmed;
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed[0] || "";
      return "";
    } catch {
      return "";
    }
  }
  return "";
};

const ProductCard = ({ product }) => {
  const image = getFirstImage(product.images);

  return (
    <Link to={`/products/${product.id}`} className="group rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md">
      <img src={image} alt={product.name} className="h-44 w-full rounded-lg object-cover" />
      <p className="mt-3 font-semibold group-hover:text-brand line-clamp-1">{product.name}</p>
      <p className="text-sm text-slate-500">Da ban: {product.sales_count} | Luot xem: {product.views_count}</p>
      <p className="mt-2 font-bold text-accent">{Number(product.price).toLocaleString("vi-VN")} VND</p>
    </Link>
  );
};

export default ProductCard;
