import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CategoryInfinitePage from "./pages/CategoryInfinitePage";
import HighlightsPage from "./pages/HighlightsPage";

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <nav className="mx-auto flex max-w-6xl gap-4 px-4 py-3 text-sm">
        <Link to="/" className="underline">Home</Link>
        <Link to="/category-infinite" className="underline">Infinite</Link>
        <Link to="/highlights" className="underline">Highlights</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
        <Route path="/category-infinite" element={<ProtectedRoute><CategoryInfinitePage /></ProtectedRoute>} />
        <Route path="/highlights" element={<ProtectedRoute><HighlightsPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
