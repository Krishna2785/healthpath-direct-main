import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">H</span>
              </div>
              <span className="font-display text-lg font-bold">HealthPath</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted healthcare marketplace. Find doctors, book appointments, and order medicines — all in one place.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Find Hospitals</Link>
              <Link to="/pharmacy" className="hover:text-primary transition-colors">Pharmacy</Link>
              <Link to="/chatbot" className="hover:text-primary transition-colors">AI Assistant</Link>
              <Link to="/dashboard" className="hover:text-primary transition-colors">My Dashboard</Link>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Specialties</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Cardiology</span>
              <span>Dermatology</span>
              <span>Orthopedics</span>
              <span>Pediatrics</span>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-3">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>support@healthpath.com</span>
              <span>1-800-HEALTH</span>
              <span>Mon–Sat, 8 AM – 8 PM</span>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>© 2026 HealthPath. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-health-red" /> for better healthcare
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
