import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HospitalCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  distance: string;
  specialties?: string[];
}

const HospitalCard = ({ id, name, image, rating, distance, specialties }: HospitalCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-foreground">{name}</h3>
        <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-health-orange text-health-orange" />
            {rating}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {distance}
          </span>
        </div>
        {specialties && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {specialties.slice(0, 3).map((s) => (
              <span key={s} className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
                {s}
              </span>
            ))}
          </div>
        )}
        <Link to={`/hospital/${id}`}>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            View Doctors
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HospitalCard;
