const FilterSidebar = ({ categories, filters, onChange, onApply }) => (
  <aside className="space-y-3 rounded-xl bg-white p-4 ring-1 ring-slate-200">
    <input className="w-full rounded-lg border p-2" placeholder="Tim theo ten..." value={filters.search} onChange={(e) => onChange("search", e.target.value)} />
    <select className="w-full rounded-lg border p-2" value={filters.category} onChange={(e) => onChange("category", e.target.value)}>
      <option value="">Tat ca danh muc</option>
      {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
    </select>
    <div className="grid grid-cols-2 gap-2">
      <input type="number" className="rounded-lg border p-2" placeholder="Gia min" value={filters.minPrice} onChange={(e) => onChange("minPrice", e.target.value)} />
      <input type="number" className="rounded-lg border p-2" placeholder="Gia max" value={filters.maxPrice} onChange={(e) => onChange("maxPrice", e.target.value)} />
    </div>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={filters.inStock} onChange={(e) => onChange("inStock", e.target.checked)} />Con hang</label>
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={filters.promotion} onChange={(e) => onChange("promotion", e.target.checked)} />Khuyen mai</label>
    <select className="w-full rounded-lg border p-2" value={filters.sort} onChange={(e) => onChange("sort", e.target.value)}>
      <option value="newest">Moi nhat</option>
      <option value="price_asc">Gia tang dan</option>
      <option value="price_desc">Gia giam dan</option>
    </select>
    <button onClick={onApply} className="w-full rounded-lg bg-brand px-3 py-2 font-semibold text-white">Ap dung</button>
  </aside>
);

export default FilterSidebar;
