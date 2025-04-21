
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  return (
    <header className={`w-full z-10 ${isHome ? 'absolute top-0' : 'bg-wizard-dark/95 shadow-md'}`}>
      <div className="container flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-wizard-primary" />
          <span className="text-xl md:text-2xl font-bold wizard-gradient-text">Wizard</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          {isHome ? (
            <Button asChild className="wizard-button">
              <Link to="/chat">Start Chat</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-white hover:text-wizard-primary">
                <Link to="/">Home</Link>
              </Button>
              <Button asChild variant="ghost" className="text-white hover:text-wizard-primary">
                <Link to="/markdown-demo">Demo</Link>
              </Button>
              <Button asChild className="wizard-button">
                <Link to="/chat">Chat</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
