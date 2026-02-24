import { Link } from "react-router-dom";
import { Star, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  fee: number;
  image: string;
  hospital?: string;
}

const DoctorCard = ({ id, name, specialty, experience, rating, fee, image, hospital }: DoctorCardProps) => {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:shadow-card-hover">
      <img
        src={image}
        alt={name}
        className="h-20 w-20 shrink-0 rounded-xl object-cover"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-semibold text-foreground truncate">{name}</h3>
        <p className="text-sm text-primary font-medium">{specialty}</p>
        {hospital && (
          <p className="text-xs text-muted-foreground mt-0.5">{hospital}</p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-health-orange text-health-orange" />
            {rating}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {experience}
          </span>
          <span className="flex items-center gap-1">
            <IndianRupee className="h-3 w-3" />
            {fee}
          </span>
        </div>
      </div>
      <div className="flex items-end shrink-0">
        <Link to={`/doctor/${id}`}>
          <Button size="sm">Book</Button>
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
