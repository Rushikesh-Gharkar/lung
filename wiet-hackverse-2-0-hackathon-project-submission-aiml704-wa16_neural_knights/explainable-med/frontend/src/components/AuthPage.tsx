import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/Firebase";

interface AuthPageProps {
  initialMode?: "signin" | "signup";
  onSuccess: (userData?: { displayName: string }) => void;
  onBack: () => void;
}

export function AuthPage({
  initialMode = "signin",
  onSuccess,
  onBack,
}: AuthPageProps) {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
        // Sign out immediately after signup so they have to sign in
        await auth.signOut();
        setSuccess(
          "Account created successfully! Please sign in with your credentials.",
        );
        setMode("signin");
        setEmail(""); // Clear fields for sign in
        setPassword("");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        onSuccess({
          displayName:
            userCredential.user.displayName || "Medical Professional",
        });
      }
    } catch (err) {
      console.error("Auth error:", err);
      // Clean, strict TypeScript error handling
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred during authentication");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Full Page Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="bg-blue-600/20 w-[600px] h-[600px] blur-[180px] rounded-full absolute -top-48 -left-24 animate-pulse" />
        <div
          className="bg-emerald-500/20 w-[500px] h-[500px] blur-[150px] rounded-full absolute bottom-0 right-0 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="bg-purple-500/10 w-[400px] h-[400px] blur-[120px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl space-y-6 relative overflow-hidden"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </h3>
            <p className="text-slate-400 text-xs font-medium">
              {mode === "signin"
                ? "Access your diagnostic workspace"
                : "Join the future of clinical medicine"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <Label
                    htmlFor="name"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 block"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400" />
                    <Input
                      id="name"
                      placeholder="Dr. Jane Smith"
                      className="pl-11 h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-blue-500 text-sm"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5 block"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@hospital.com"
                  className="pl-11 h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-blue-500 text-sm"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center mb-0.5">
                <Label
                  htmlFor="password"
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block"
                >
                  Password
                </Label>
                {mode === "signin" && (
                  <button
                    type="button"
                    className="text-[9px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wider"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-11 h-10 bg-slate-50 border-slate-100 rounded-xl focus:ring-blue-500 text-sm"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {success && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-700 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-2xl font-bold text-base text-white shadow-xl shadow-blue-600/20 transition-all mt-2 active:scale-95 border-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                />
              ) : (
                <>
                  {mode === "signin" ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-slate-50">
            <p className="text-xs text-slate-500 font-medium">
              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-bold text-blue-600 hover:underline transition-all underline-offset-4"
              >
                {mode === "signin" ? "Sign Up Free" : "Sign In"}
              </button>
            </p>
          </div>

          <button
            onClick={onBack}
            className="w-full text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors pt-2"
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}
