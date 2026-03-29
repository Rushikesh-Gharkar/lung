import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ImageUploader } from "@/components/ImageUploader";
import { ResultsView } from "@/components/ResultsView";
import type { AnalysisResult } from "@/components/ResultsView";
import { LandingPage } from "@/components/LandingPage";
import { AuthPage } from "@/components/AuthPage";
import { analyzeViaBackend } from "@/lib/backend";
import { ShieldCheck } from "lucide-react";
// FIX: Import the Firebase listener and auth instance
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/Firebase";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<"signin" | "signup" | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [user, setUser] = useState<{ displayName: string } | null>(null);

  // FIX: Added Firebase Auth Listener to remember user on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        // Grab the name they typed during signup, or fallback
        setUser({
          displayName: firebaseUser.displayName || "Medical Professional",
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    try {
      const res = await analyzeViaBackend(file);
      setResult(res);
    } catch (error) {
      console.error("Backend analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setIsAnalyzing(false);
  };

  const handleAuthSuccess = (userData?: { displayName: string }) => {
    setIsAuthenticated(true);
    setUser(userData || { displayName: "Medical Professional" });
    setAuthView(null);
  };

  const handleLogout = async () => {
    // FIX: Actually log them out of Firebase!
    await auth.signOut();
    setIsAuthenticated(false);
    setUser(null);
    setAuthView(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans overflow-hidden">
      <DashboardHeader
        isAuthenticated={isAuthenticated}
        isAuthPage={!!authView}
        userName={user?.displayName}
        onSignin={() => setAuthView("signin")}
        onSignup={() => setAuthView("signup")}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          {authView ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 overflow-hidden"
            >
              <AuthPage
                initialMode={authView}
                onSuccess={handleAuthSuccess}
                onBack={() => setAuthView(null)}
              />
            </motion.div>
          ) : !isAuthenticated ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full overflow-y-auto"
            >
              <LandingPage onGetStarted={() => setAuthView("signup")} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center p-4"
            >
              {!result ? (
                <ImageUploader
                  onAnalyze={handleAnalyze}
                  isAnalyzing={isAnalyzing}
                />
              ) : (
                <ResultsView result={result} onReset={handleReset} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!authView && (
        <footer className="w-full py-8 border-t border-slate-100 bg-slate-50/30">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              Research Use Only
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              This tool is for research and educational purposes only. It does
              not provide medical advice, diagnosis, or treatment. All AI
              outputs require validation by qualified medical professionals.
            </p>
            <div className="pt-2 text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
              MediSense © 2026 · Neural Knights
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
