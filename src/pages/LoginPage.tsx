import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Lock, Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth delay
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'admin@smepro.com' && password === 'admin123') {
        toast.success('Successfully logged in!');
        navigate('/');
      } else if (email && password) {
        // For demo, allow any valid-looking creds
        toast.success('Successfully logged in (Demo Mode)');
        navigate('/');
      } else {
        toast.error('Invalid credentials. Use admin@smepro.com / admin123');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary text-primary-foreground p-3 rounded-2xl mb-4 shadow-lg shadow-primary/20">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">SME Lead Pro</h1>
          <p className="text-muted-foreground mt-2">Manage your website leads efficiently</p>
        </div>

        <Card className="border-none shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    className="pl-10" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" className="px-0 font-medium text-xs text-primary" type="button">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type={showPassword ? 'text' : 'password'} 
                    className="pl-10 pr-10" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    type="button"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <Button className="w-full h-11" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col border-t pt-6 gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-full border-t" />
              <span className="shrink-0 uppercase">Demo Access</span>
              <span className="w-full border-t" />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Email: <code className="bg-muted px-1 rounded">admin@smepro.com</code><br/>
              Pass: <code className="bg-muted px-1 rounded">admin123</code>
            </p>
          </CardFooter>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account? <Button variant="link" className="px-1 text-primary">Get started</Button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;