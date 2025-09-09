/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useLoginMutation } from "../../../redux/features/authApi";
import { toast } from "sonner";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import config from "../../../config";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// lightweight google icon (no extra deps)
const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="20" height="20" {...props}>
    <path fill="#EA4335" d="M24 9.5c3.8 0 6.5 1.6 8 3l6-6C34.6 1.9 29.7 0 24 0 14.7 0 6.6 5.4 3 13.1l7.4 5.7C12.3 12.9 17.6 9.5 24 9.5z" />
    <path fill="#34A853" d="M46.5 24c0-1.6-.2-3.2-.5-4.7H24v9.4h12.7c-.6 2.9-2.3 5.3-4.9 6.9l7.1 5.5c4.3-3.9 7.6-10 7.6-17.1z" />
    <path fill="#FBBC05" d="M10.3 28.3c-.7-2-1-4.2-1-6.3s.3-4.3 1-6.3L2.9 10C1 13.6 0 17.6 0 22s1 8.4 2.9 12l7.4-5.7z" />
    <path fill="#4285F4" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.1-5.5c-2 1.3-4.7 2.2-8.7 2.2-6.6 0-12.2-4.3-14.2-10.1l-7.4 5.7C6.6 42.6 14.4 48 24 48z" />
  </svg>
);

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("Logged in successfully");
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      }
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${config.baseUrl}/auth/google`, "_self");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left: Full-height visual */}
      <div className="relative hidden lg:block">
        <img
          src="https://i.ibb.co.com/VWW4xqnG/d9c744e37957a494304dd200153b27e7be069984-1.jpg"
          alt="Sign in visual"
          className="h-screen w-full object-cover dark:brightness-80"
        />
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Sign In Page
          </h1>

          {/* Social (Google only) */}
          <div className="mt-8 space-y-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full h-11 justify-start gap-3 rounded-md"
            >
              <GoogleIcon />
              <span className="text-sm sm:text-base font-medium">
                Continue with Google
              </span>
            </Button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-card-foreground">
                User name or email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                className={`h-12 text-base ${errors.email ? "border-destructive" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-card-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  className={`h-12 text-base pr-20 ${errors.password ? "border-destructive" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-3 flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
              >
                Forgot your password
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                replace
                className="font-semibold text-foreground underline underline-offset-4 hover:text-primary"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;