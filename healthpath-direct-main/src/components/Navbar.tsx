import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const isAuthenticated =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">H</span>
          </div>
          <span className="hidden font-display text-xl font-bold text-foreground sm:block">
            HealthPath
          </span>
        </Link>

        {/* Search bar - desktop */}
        <form onSubmit={handleSearch} className="hidden flex-1 max-w-xl md:flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search hospitals, specialties, doctors..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="button" className="flex items-center gap-1 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
            <MapPin className="h-4 w-4" />
            <span className="hidden lg:inline">Location</span>
          </button>
        </form>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/pharmacy">
            <Button variant="ghost" size="sm">Pharmacy</Button>
          </Link>
          <Link to="/chatbot">
            <Button variant="ghost" size="sm">AI Assistant</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          {isAuthenticated ? (
            <Button size="sm" className="gap-1.5" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button size="sm" className="gap-1.5">
                <User className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border px-4 py-2 md:hidden">
        <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search hospitals, doctors..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            <Link to="/pharmacy" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Pharmacy</Button>
            </Link>
            <Link to="/chatbot" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">AI Assistant</Button>
            </Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
            </Link>
            {isAuthenticated ? (
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Login / Signup</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
