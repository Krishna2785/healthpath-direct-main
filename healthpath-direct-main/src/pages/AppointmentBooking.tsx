import { useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, User, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { doctors } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const AppointmentBooking = () => {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const preSelectedSlot = searchParams.get("slot") || "";
  const doctor = doctors.find((d) => d.id === doctorId);

  const [selectedSlot, setSelectedSlot] = useState(preSelectedSlot);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [formData, setFormData] = useState({ name: "", phone: "", notes: "" });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !formData.name || !formData.phone) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    toast({
      title: "Appointment Booked! ✅",
      description: `Your appointment with ${doctor.name} on ${selectedDate} at ${selectedSlot} has been confirmed.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-8 max-w-2xl">
        <Link to={`/doctor/${doctor.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Doctor
        </Link>

        <h1 className="font-display text-2xl font-bold mb-2">Book Appointment</h1>
        <p className="text-muted-foreground mb-8">Complete the form to confirm your booking</p>

        {/* Doctor Info */}
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card mb-8">
          <img src={doctor.image} alt={doctor.name} className="h-16 w-16 rounded-xl object-cover" />
          <div>
            <h3 className="font-display font-semibold">{doctor.name}</h3>
            <p className="text-sm text-primary">{doctor.specialty}</p>
            <p className="text-xs text-muted-foreground">{doctor.hospital} · ₹{doctor.fee}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Select Date
            </label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="rounded-xl"
            />
          </div>

          {/* Time slot */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Clock className="h-4 w-4 text-primary" /> Select Time Slot
            </label>
            <div className="flex flex-wrap gap-2">
              {doctor.availability.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={selectedSlot === slot ? "default" : "outline"}
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>

          {/* Patient details */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <User className="h-4 w-4 text-primary" /> Patient Name *
            </label>
            <Input
              placeholder="Enter full name"
              className="rounded-xl"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Phone className="h-4 w-4 text-primary" /> Phone Number *
            </label>
            <Input
              type="tel"
              placeholder="Enter phone number"
              className="rounded-xl"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <FileText className="h-4 w-4 text-primary" /> Notes (optional)
            </label>
            <Textarea
              placeholder="Describe your symptoms or any notes for the doctor"
              className="rounded-xl"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <Button type="submit" size="lg" className="w-full rounded-xl">
            Confirm Appointment
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentBooking;
