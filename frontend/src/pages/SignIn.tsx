import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn, SignInData } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import AuthBackground from '@/components/AuthBackground';

const SignIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInData>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = async (data: SignInData) => {
    try {
      const response = await signIn(data);
      localStorage.setItem('token', response.access_token);
      toast({
        title: "Success",
        description: "Signed in successfully",
      });
      navigate('/chat');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid credentials",
      });
    }
  };

  return (
    <>
      <AuthBackground />
      <div className="container relative z-10 flex items-center justify-center min-h-screen py-10">
        <Card className="w-full max-w-md backdrop-blur-sm bg-card/80">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  {...register('username', { required: 'Username is required' })}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignIn;
