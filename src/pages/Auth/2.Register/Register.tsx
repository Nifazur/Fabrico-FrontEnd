/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useRegisterMutation } from "../../../redux/features/authApi";
import { toast } from "sonner";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import config from "../../../config";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  agreeToTerms?: boolean;          // UI-only, won't be sent
  subscribeNewsletter?: boolean;   // UI-only, won't be sent
}

// Optional: strict payload type for the mutation call
type SignUpPayload = Pick<SignUpFormData, "name" | "email" | "password">;

// Lightweight Google icon
const GoogleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 48 48" width="20" height="20" {...props}>
    <path fill="#EA4335" d="M24 9.5c3.8 0 6.5 1.6 8 3l6-6C34.6 1.9 29.7 0 24 0 14.7 0 6.6 5.4 3 13.1l7.4 5.7C12.3 12.9 17.6 9.5 24 9.5z" />
    <path fill="#34A853" d="M46.5 24c0-1.6-.2-3.2-.5-4.7H24v9.4h12.7c-.6 2.9-2.3 5.3-4.9 6.9l7.1 5.5c4.3-3.9 7.6-10 7.6-17.1z" />
    <path fill="#FBBC05" d="M10.3 28.3c-.7-2-1-4.2-1-6.3s.3-4.3 1-6.3L2.9 10C1 13.6 0 17.6 0 22s1 8.4 2.9 12l7.4-5.7z" />
    <path fill="#4285F4" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.1-5.5c-2 1.3-4.7 2.2-8.7 2.2-6.6 0-12.2-4.3-14.2-10.1l-7.4 5.7C6.6 42.6 14.4 48 24 48z" />
  </svg>
);

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeToTerms: false,
      subscribeNewsletter: false,
    },
  });

  const [signUp, { isLoading }] = useRegisterMutation();

  // ONLY send name, email, password to backend
  const onSubmit: SubmitHandler<SignUpFormData> = async ({ name, email, password }) => {
    try {
      const payload: SignUpPayload = { name, email, password };
      const res = await signUp(payload).unwrap();

      if (res.success) {
        toast.success("Account created successfully!");
        navigate("/login");
      }
    } catch (err: any) {
      if (err?.data?.message === "Zod Error" && err?.data?.errorSources) {
        err.data.errorSources.forEach((error: any) => {
          const fieldName = error.path;
          const message = error.message;
          toast.error(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}: ${message}`);
        });
      } else if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  };

  const handleGoogleSignUp = () => {
    window.open(`${config.baseUrl}/auth/google`, "_self");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      {/* Left: Full-height image */}
      <div className="relative hidden lg:block">
        <img
          src="https://i.ibb.co.com/VWW4xqnG/d9c744e37957a494304dd200153b27e7be069984-1.jpg"
          alt="Register visual"
          className="h-screen w-full object-cover brightness-80"
        />
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Sign Up</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up for free to access any of our products
          </p>

          {/* Social (Google only) */}
          <div className="mt-8 space-y-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleSignUp}
              className="w-full h-11 justify-start gap-3 rounded-md"
            >
              <GoogleIcon />
              <span className="text-sm sm:text-base font-medium">Continue with Google</span>
            </Button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nahaz"
                className={`h-12 text-base ${errors.name ? "border-destructive" : ""}`}
                {...register("name", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" },
                  pattern: {
                    value: /^[A-Za-z][A-Za-z\s'-]{1,}$/,
                    message: "Use letters, spaces, apostrophes or hyphens only",
                  },
                })}
              />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="nahaz@example.com"
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
                <p className="text-sm text-destructive">Error: {errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nahaz12345!"
                  className={`h-12 text-base pr-20 ${errors.password ? "border-destructive" : ""}`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Use at least 8 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message: "Use letters (upper & lower), numbers, and a special character",
                    },
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
              <p className="text-xs text-muted-foreground">
                Use 8 or more characters with a mix of letters, numbers & symbols
              </p>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Checkboxes (UI only, not sent) */}
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  {...register("agreeToTerms", { required: "You must agree to the terms" })}
                />
                <span className="text-sm text-muted-foreground">
                  Agree to our{" "}
                  <Link to="/terms" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                    Terms of use
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>
              )}

              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  {...register("subscribeNewsletter")}
                />
                <span className="text-sm text-muted-foreground">
                  Subscribe to our monthly newsletter
                </span>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
              disabled={!isValid || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign Up</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                replace
                className="font-semibold text-foreground underline underline-offset-4 hover:text-primary"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;