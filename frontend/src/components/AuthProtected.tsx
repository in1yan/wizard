
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface AuthProtectedProps {
  children: React.ReactNode;
}

const AuthProtected = ({ children }: AuthProtectedProps) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthError = (event: MessageEvent) => {
      if (event.data?.type === 'API_ERROR' && event.data?.status === 401) {
        localStorage.removeItem('token');
        toast({
          title: "Session expired",
          description: "Please sign in again",
          variant: "destructive",
        });
        navigate('/signin');
      }
    };

    window.addEventListener('message', handleAuthError);
    return () => window.removeEventListener('message', handleAuthError);
  }, [navigate, toast]);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default AuthProtected;
