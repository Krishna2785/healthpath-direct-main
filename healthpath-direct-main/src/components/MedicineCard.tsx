import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MedicineCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  onAddToCart: (id: string) => void;
}

const MedicineCard = ({ id, name, price, image, category, inStock, onAddToCart }: MedicineCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-health-blue-light text-3xl mx-auto mb-3">
        {image}
      </div>
      <span className="text-xs font-medium text-primary">{category}</span>
      <h3 className="mt-1 font-medium text-foreground text-sm">{name}</h3>
      <div className="mt-3 flex items-center justify-between">
        <span className="font-display font-bold text-foreground">₹{price}</span>
        <Button
          size="sm"
          variant={inStock ? "default" : "outline"}
          disabled={!inStock}
          onClick={() => onAddToCart(id)}
          className="gap-1 text-xs"
        >
          <ShoppingCart className="h-3 w-3" />
          {inStock ? "Add" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default MedicineCard;
