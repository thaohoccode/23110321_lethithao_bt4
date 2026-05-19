import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold text-brand">Sneaker One</h1>
        <div className="flex items-center gap-3">
          <img src={auth?.user?.avatar} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
          <p className="text-sm font-semibold">{auth?.user?.username}</p>
          <button onClick={logout} className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
