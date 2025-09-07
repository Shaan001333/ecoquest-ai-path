import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, TreePine, Users, GraduationCap } from "lucide-react";

interface LoginFormProps {
  onLogin: (email: string, role: "student" | "teacher") => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    school: "",
    role: "student" as "student" | "teacher"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would handle authentication
    onLogin(formData.email, formData.role);
  };

  return (
    <div className="min-h-screen bg-gradient-nature flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10"></div>
      
      <Card className="relative w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur">
        <CardHeader className="text-center pb-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-gradient-coin rounded-full p-3">
              <TreePine className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary">EcoQuest</h1>
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? "Welcome Back!" : "Join the Mission"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Continue your environmental learning journey" 
              : "Start your eco-education adventure today"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="school">School/Institution</Label>
                  <Input
                    id="school"
                    type="text"
                    placeholder="Enter your school name"
                    value={formData.school}
                    onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                    required={!isLogin}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select value={formData.role} onValueChange={(value: "student" | "teacher") => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Student
                        </div>
                      </SelectItem>
                      <SelectItem value="teacher">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Teacher
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              variant="nature" 
              className="w-full h-12 text-lg font-bold"
            >
              <Leaf className="w-5 h-5" />
              {isLogin ? "Log In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin ? "New to EcoQuest?" : "Already have an account?"}
            </p>
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary font-bold"
            >
              {isLogin ? "Create an account" : "Sign in instead"}
            </Button>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-bold text-center mb-2">🚀 Quick Demo</p>
            <p className="text-xs text-muted-foreground text-center">
              Use any email and password to explore the app!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}