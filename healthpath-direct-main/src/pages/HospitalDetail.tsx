import { useParams, Link } from "react-router-dom";
import { Star, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorCard from "@/components/DoctorCard";
import { hospitals, doctors } from "@/data/mockData";

const HospitalDetail = () => {
  const { id } = useParams();
  const hospital = hospitals.find((h) => h.id === id);

  if (!hospital) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Hospital not found</h1>
          <Link to="/"><Button className="mt-4">Go Home</Button></Link>
        </div>
      </div>
    );
  }

  const hospitalDoctors = doctors.filter((d) => hospital.doctors.includes(d.id));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Banner */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto pb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-2 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{hospital.name}</h1>
        </div>
      </div>

      <div className="container mx-auto py-8">
        {/* Info */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-health-orange text-health-orange" /> {hospital.rating} rating
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" /> {hospital.address}
          </span>
          <span className="text-sm text-muted-foreground">{hospital.distance} away</span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2 mb-8">
          {hospital.specialties.map((s) => (
            <span key={s} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{s}</span>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="mb-8 rounded-xl border border-border bg-muted h-48 flex items-center justify-center text-muted-foreground text-sm">
          📍 Google Maps integration placeholder
        </div>

        {/* Doctors */}
        <h2 className="font-display text-xl font-bold mb-4">Our Doctors</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {hospitalDoctors.map((d) => (
            <DoctorCard key={d.id} {...d} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HospitalDetail;
