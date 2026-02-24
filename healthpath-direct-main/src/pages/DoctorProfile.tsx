import { useParams, Link } from "react-router-dom";
import { Star, Clock, IndianRupee, Building2, GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors, reviews } from "@/data/mockData";

const DoctorProfile = () => {
  const { id } = useParams();
  const doctor = doctors.find((d) => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Doctor not found</h1>
          <Link to="/"><Button className="mt-4">Go Home</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-8">
        <Link to={`/hospital/${doctor.hospitalId}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Hospital
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Profile card */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card text-center sticky top-24">
              <img src={doctor.image} alt={doctor.name} className="h-28 w-28 rounded-2xl object-cover mx-auto" />
              <h1 className="mt-4 font-display text-xl font-bold">{doctor.name}</h1>
              <p className="text-sm text-primary font-medium">{doctor.specialty}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-muted p-3">
                  <Star className="h-4 w-4 text-health-orange mx-auto" />
                  <p className="mt-1 font-semibold">{doctor.rating}</p>
                  <p className="text-xs text-muted-foreground">{doctor.reviews} reviews</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <Clock className="h-4 w-4 text-primary mx-auto" />
                  <p className="mt-1 font-semibold">{doctor.experience}</p>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-left">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <GraduationCap className="h-4 w-4 shrink-0" />
                  {doctor.qualification}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 shrink-0" />
                  {doctor.hospital}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <IndianRupee className="h-4 w-4 shrink-0" />
                  ₹{doctor.fee} consultation fee
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Time slots */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-bold mb-4">Available Time Slots</h2>
              <p className="text-sm text-muted-foreground mb-4">Today's availability</p>
              <div className="flex flex-wrap gap-2">
                {doctor.availability.map((slot) => (
                  <Link key={slot} to={`/book/${doctor.id}?slot=${encodeURIComponent(slot)}`}>
                    <Button variant="outline" size="sm" className="rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors">
                      {slot}
                    </Button>
                  </Link>
                ))}
              </div>
              <Link to={`/book/${doctor.id}`}>
                <Button className="mt-6 w-full rounded-xl" size="lg">Book Appointment</Button>
              </Link>
            </div>

            {/* Reviews */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="font-display text-lg font-bold mb-4">Patient Reviews</h2>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{r.user}</span>
                      <span className="text-xs text-muted-foreground">{r.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-health-orange text-health-orange" />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DoctorProfile;
