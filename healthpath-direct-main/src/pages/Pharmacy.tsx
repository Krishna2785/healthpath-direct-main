import { useState } from "react";
import { Search, Upload, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MedicineCard from "@/components/MedicineCard";
import { medicines } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const Pharmacy = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (id: string) => {
    const med = medicines.find((m) => m.id === id);
    if (!med) return;
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, name: med.name, price: med.price, qty: 1 }];
    });
    toast({ title: `${med.name} added to cart` });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Pharmacy</h1>
            <p className="text-muted-foreground">Order medicines & upload prescriptions</p>
          </div>
          <Button
            variant="outline"
            className="gap-2 relative"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cart.length}
              </span>
            )}
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 mb-6 max-w-md">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-8">
          {/* Medicines grid */}
          <div className="flex-1">
            {/* Upload prescription */}
            <div className="mb-8 rounded-xl border-2 border-dashed border-border bg-card p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="font-medium text-sm">Upload Prescription</p>
              <p className="text-xs text-muted-foreground mt-1">Upload your prescription and we'll prepare your order</p>
              <Input type="file" accept="image/*,.pdf" className="mt-3 max-w-xs mx-auto" />
            </div>

            <h2 className="font-display text-lg font-bold mb-4">All Medicines</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((m) => (
                <MedicineCard key={m.id} {...m} onAddToCart={addToCart} />
              ))}
            </div>
          </div>

          {/* Cart sidebar - desktop */}
          {showCart && (
            <div className="hidden md:block w-80 shrink-0">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-4 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">Your Cart</h3>
                  <button onClick={() => setShowCart(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.qty} × ₹{item.price}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-destructive text-xs">Remove</button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-semibold text-sm mb-3">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                      <Button className="w-full rounded-xl" onClick={() => toast({ title: "Order placed! 🎉" })}>
                        Place Order
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pharmacy;
