import { useState } from "react";
import { Calendar, Package, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const tabs = [
  { id: "appointments", label: "My Appointments", icon: Calendar },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "profile", label: "Profile Settings", icon: User },
];

const mockAppointments = [
  { id: "1", doctor: "Dr. Sarah Johnson", specialty: "Cardiologist", date: "Feb 25, 2026", time: "10:00 AM", status: "Confirmed" },
  { id: "2", doctor: "Dr. Priya Sharma", specialty: "Pediatrician", date: "Feb 28, 2026", time: "3:00 PM", status: "Pending" },
];

const mockOrders = [
  { id: "ORD001", items: "Paracetamol, Vitamin D3", total: 175, status: "Delivered", date: "Feb 20, 2026" },
  { id: "ORD002", items: "Cetirizine, Multivitamin", total: 235, status: "In Transit", date: "Feb 23, 2026" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments");

  const statusColor = (status: string) => {
    if (status === "Confirmed" || status === "Delivered") return "bg-health-green-light text-health-green";
    if (status === "Pending" || status === "In Transit") return "bg-health-orange-light text-health-orange";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto py-8">
        <h1 className="font-display text-2xl font-bold mb-6">My Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border pb-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors shrink-0 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Appointments */}
        {activeTab === "appointments" && (
          <div className="space-y-4">
            {mockAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card">
                <div>
                  <h3 className="font-semibold">{apt.doctor}</h3>
                  <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                  <p className="text-sm text-muted-foreground mt-1">{apt.date} at {apt.time}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => toast({ title: "Appointment cancelled" })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card">
                <div>
                  <h3 className="font-semibold text-sm">Order #{order.id}</h3>
                  <p className="text-sm text-muted-foreground">{order.items}</p>
                  <p className="text-xs text-muted-foreground mt-1">{order.date} · ₹{order.total}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <div className="max-w-md space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Full Name</label>
              <Input defaultValue="John Doe" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input defaultValue="john@example.com" className="rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Phone</label>
              <Input defaultValue="+91 9876543210" className="rounded-xl" />
            </div>
            <Button className="rounded-xl" onClick={() => toast({ title: "Profile updated ✅" })}>
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
