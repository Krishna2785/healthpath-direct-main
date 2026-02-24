import { Link } from "react-router-dom";
import { Search, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HospitalCard from "@/components/HospitalCard";
import { specialties, hospitals } from "@/data/mockData";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        </div>
        <div className="container relative mx-auto py-20 md:py-28 text-center">
          <h1 className="font-display text-3xl font-extrabold text-primary-foreground md:text-5xl lg:text-6xl leading-tight animate-fade-in">
            Find the Right Doctor<br />Near You
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in">
            Book appointments with top-rated doctors, order medicines, and get AI-powered health guidance — all in one place.
          </p>
          <div className="mt-8 flex justify-center animate-fade-in">
            <div className="flex w-full max-w-xl items-center gap-2 rounded-2xl bg-card p-2 shadow-elevated">
              <Search className="ml-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search hospitals, specialties, doctors..."
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <Button size="sm" className="rounded-xl px-6">Search</Button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Verified Doctors</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> Instant Booking</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4" /> 4.8★ Average Rating</span>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="container mx-auto py-12">
        <h2 className="font-display text-2xl font-bold text-foreground">Browse by Specialty</h2>
        <p className="mt-1 text-muted-foreground">Find doctors across all major specialties</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {specialties.map((s) => (
            <Link
              key={s.id}
              to={`/?specialty=${s.id}`}
              className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <span className="text-3xl">{s.icon}</span>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Nearby Hospitals */}
      <section className="container mx-auto py-12">
        <h2 className="font-display text-2xl font-bold text-foreground">Nearby Hospitals</h2>
        <p className="mt-1 text-muted-foreground">Top-rated hospitals near your location</p>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {hospitals.map((h) => (
            <HospitalCard
              key={h.id}
              id={h.id}
              name={h.name}
              image={h.image}
              rating={h.rating}
              distance={h.distance}
              specialties={h.specialties}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto py-12">
        <div className="rounded-2xl gradient-hero p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
            Need Health Guidance?
          </h2>
          <p className="mt-2 text-primary-foreground/80 max-w-md mx-auto">
            Chat with our AI assistant to understand your symptoms and find the right specialist.
          </p>
          <Link to="/chatbot">
            <Button size="lg" variant="secondary" className="mt-6 rounded-xl">
              Talk to AI Assistant
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
