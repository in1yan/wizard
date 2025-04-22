
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isHome = location.pathname === '/';
  const token = localStorage.getItem('token');
  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    toast({
      title: "Success",
      description: "Signed out successfully",
    });
    navigate('/signin');
  };
  
  return (
    <header className={`w-full z-10 ${isHome ? 'absolute top-0' : 'bg-wizard-dark/95 shadow-md'}`}>
      <div className="container flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-wizard-primary" />
          <span className="text-xl md:text-2xl font-bold wizard-gradient-text">Wizard</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {token ? (
            <>
              <Button asChild variant="ghost" className="text-white hover:text-wizard-primary">
                <Link to="/chat">Chat</Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="text-white hover:text-wizard-primary flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-white hover:text-wizard-primary">
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button asChild className="wizard-button">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
